package com.example.task03.user;

import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class AuthController {
    
    private final UserService userService;
    
    public AuthController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }
    
    @GetMapping("/register")
    public String registerPage(Model model) {
        User user = new User();
        user.setRole("ROLE_USER"); // Set default role
        model.addAttribute("user", user);
        return "register";
    }
    
    @PostMapping("/register")
    public String register(@Valid @ModelAttribute("user") User user, 
                          BindingResult result, 
                          Model model,
                          RedirectAttributes redirectAttributes) {
        
        // Ensure role is set even if form doesn't include it
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("ROLE_USER");
        }
        
        if (result.hasErrors()) {
            return "register";
        }
        
        if (userService.usernameExists(user.getUsername())) {
            model.addAttribute("error", "Nazwa użytkownika już istnieje");
            return "register";
        }
        
        try {
            if (user.getRole() == null || user.getRole().isEmpty()) {
                user.setRole("ROLE_USER");
            }
            
            userService.registerUser(user);
            redirectAttributes.addFlashAttribute("success", "Rejestracja zakończona sukcesem! Zaloguj się.");
            return "redirect:/login";
        } 
        catch (Exception e) {
            model.addAttribute("error", "Rejestracja nie powiodła się: " + e.getMessage());
            return "register";
        }
    }
    
    @GetMapping("/home")
    public String home() {
        return "home";
    }
}
