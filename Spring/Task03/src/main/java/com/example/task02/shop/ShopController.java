package com.example.task02.shop;

import com.example.task02.cart.CartItem;
import com.example.task02.cart.CartService;
import com.example.task02.product.Product;
import com.example.task02.product.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
@RequestMapping("/shop")
public class ShopController {
    
    private final ProductService productService;
    private final CartService cartService;
    
    public ShopController(ProductService productService, CartService cartService) {
        this.productService = productService;
        this.cartService = cartService;
    }
    
    @GetMapping
    public String showShop(Model model) {
        List<Product> products = productService.getAllProducts();
        model.addAttribute("products", products);
        return "shop";
    }
    
    @PostMapping("/add-to-cart/{id}")
    public String addToCart(@PathVariable Integer id,
                           @RequestParam(defaultValue = "1") Integer quantity,
                           HttpServletRequest request,
                           HttpServletResponse response,
                           RedirectAttributes redirectAttributes) {
        try {
            Product product = productService.getProductById(id);
            CartItem cartItem = new CartItem(
                    product.getId(),
                    product.getName(),
                    product.getPrice(),
                    quantity
            );
            cartService.addToCart(request, response, cartItem);
            redirectAttributes.addFlashAttribute("success", 
                    product.getName() + " dodano do koszyka!");
        } 
        catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", 
                    "Nie udało się dodać produktu do koszyka: " + e.getMessage());
        }
        return "redirect:/shop";
    }
}
