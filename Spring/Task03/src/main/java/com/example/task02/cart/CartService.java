package com.example.task02.cart;

import com.example.task02.user.User;
import com.example.task02.user.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {
    
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    
    public CartService(CartItemRepository cartItemRepository, UserRepository userRepository) {
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
    }
    
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));
    }
    
    public List<CartItem> getCart(HttpServletRequest request) {
        User user = getCurrentUser();
        List<CartItemEntity> entities = cartItemRepository.findByUser(user);
        return entities.stream()
                .map(e -> new CartItem(e.getProductId(), e.getProductName(), e.getPrice(), e.getQuantity()))
                .collect(Collectors.toList());
    }
    
    @Transactional
    public void addToCart(HttpServletRequest request, HttpServletResponse response, CartItem newItem) {
        User user = getCurrentUser();
        
        Optional<CartItemEntity> existing = cartItemRepository.findByUserAndProductId(user, newItem.getProductId());
        
        if (existing.isPresent()) {
            CartItemEntity entity = existing.get();
            entity.setQuantity(entity.getQuantity() + newItem.getQuantity());
            cartItemRepository.save(entity);
        } 
        else {
            CartItemEntity entity = new CartItemEntity();
            entity.setUser(user);
            entity.setProductId(newItem.getProductId());
            entity.setProductName(newItem.getProductName());
            entity.setPrice(newItem.getPrice());
            entity.setQuantity(newItem.getQuantity());
            cartItemRepository.save(entity);
        }
    }
    
    @Transactional
    public void updateCartItemQuantity(HttpServletRequest request, HttpServletResponse response, Integer productId, Integer newQuantity) {
        User user = getCurrentUser();
        Optional<CartItemEntity> existing = cartItemRepository.findByUserAndProductId(user, productId);
        existing.ifPresent(entity -> {
            entity.setQuantity(newQuantity);
            cartItemRepository.save(entity);
        });
    }
    
    @Transactional
    public void removeFromCart(HttpServletRequest request, HttpServletResponse response, Integer productId) {
        User user = getCurrentUser();
        Optional<CartItemEntity> existing = cartItemRepository.findByUserAndProductId(user, productId);
        existing.ifPresent(cartItemRepository::delete);
    }
    
    @Transactional
    public void clearCart(HttpServletResponse response) {
        User user = getCurrentUser();
        cartItemRepository.deleteByUser(user);
    }
    
    public Double getCartTotal(HttpServletRequest request) {
        User user = getCurrentUser();
        List<CartItemEntity> items = cartItemRepository.findByUser(user);
        return items.stream()
                .mapToDouble(CartItemEntity::getSubtotal)
                .sum();
    }
}
