package com.example.task02.cart;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
@RequestMapping("/cart")
public class CartController {
    
    private final CartService cartService;
    
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }
    
    @GetMapping
    public String viewCart(HttpServletRequest request, Model model) {
        List<CartItem> cart = cartService.getCart(request);
        Double total = cartService.getCartTotal(request);
        
        model.addAttribute("cartItems", cart);
        model.addAttribute("total", total);
        return "cart";
    }
    
    @PostMapping("/update/{productId}")
    public String updateCartItem(@PathVariable Integer productId,
                                @RequestParam Integer quantity,
                                HttpServletRequest request,
                                HttpServletResponse response,
                                RedirectAttributes redirectAttributes) {
        if (quantity < 1) {
            redirectAttributes.addFlashAttribute("error", "Ilość musi wynosić co najmniej 1");
        } 
        else {
            cartService.updateCartItemQuantity(request, response, productId, quantity);
            redirectAttributes.addFlashAttribute("success", "Ilość zaktualizowana");
        }
        return "redirect:/cart";
    }
    
    @PostMapping("/remove/{productId}")
    public String removeFromCart(@PathVariable Integer productId,
                                HttpServletRequest request,
                                HttpServletResponse response,
                                RedirectAttributes redirectAttributes) {
        cartService.removeFromCart(request, response, productId);
        redirectAttributes.addFlashAttribute("success", "Produkt usunięty z koszyka");
        return "redirect:/cart";
    }
    
    @PostMapping("/clear")
    public String clearCart(HttpServletResponse response,
                          RedirectAttributes redirectAttributes) {
        cartService.clearCart(response);
        redirectAttributes.addFlashAttribute("success", "Koszyk wyczyszczony");
        return "redirect:/cart";
    }
}
