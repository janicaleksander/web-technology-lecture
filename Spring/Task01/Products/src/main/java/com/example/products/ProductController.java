/*
 * ******************************************************************************
 * @file           : ProductController.java
 * @author         : Alex Rogoziński
 * @brief          : Controller module to manage flow of operations 
 *                   on the website.
 * ******************************************************************************
 */

package com.example.products;

// -----------------------------------------------------------------------------
// Imports
// -----------------------------------------------------------------------------
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Class representing the Controller in MVC style.
 * Handles routing, request processing and redirection to Thymeleaf views.
 */
@Controller
public class ProductController {
    private final ProductService productService;

    /**
     * Parametrized constructor. Requires `ProductService` class instance 
     * to perform DI (Dependency Injection).
     * 
     * @param productService `ProductService` class instance.
     */
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    /**
     * Provides the main product list view.
     * Loads all products and binds them to the model.
     * 
     * @param model MVC model to pass data into the view.
     * @return Name of the Thymeleaf template displaying product list.
     */
    @GetMapping("/product/")    
    public String list(Model model) {
        model.addAttribute("products", productService.getProducts());
        return "product/index";
    }

    /**
     * Seeds the product list with two predefined demonstrative entries.
     * Used only for testing and initial dataset population.
     * 
     * @return Redirect instruction to refresh the product list page.
     */
    @GetMapping("/product/seed")
    public String seed() {
        productService.seedProducts();
        return "redirect:/product/";
    }
    
    /**
     * Displays the form used to add a new product.
     * Binds an empty product object for form population.
     * 
     * @param model MVC model used to provide a blank product instance.
     * @return Name of the Thymeleaf template containing add form.
     */
    @GetMapping("/product/add")
    public String addFrom(Model model) {
        model.addAttribute("product", new Product());
        return "product/add";
    }

    /**
     * Processes POST requests for adding a new product.
     * Stores submitted form data using `ProductService`.
     */
    @PostMapping("/product/add")
    public String addSave(@ModelAttribute Product product) {
        productService.addProduct(product);
        return "redirect:/product/";
    }

    /**
     * Displays detailed information about the selected product.
     * 
     * @param inputId Product identifier passed as request parameter.
     * @param model MVC model to expose selected product to the view.
     * @return Name of the Thymeleaf template showing product details.
     */
    @GetMapping("/product/details")
    public String details(@RequestParam("id") long inputId, Model model) {
        model.addAttribute("product", productService.getProductById(inputId));
        return "product/details";
    }

    /**
     * Displays form for editing an existing product.
     * Loads product data based on the ID provided in query string.
     * 
     * @param inputId Product identifier used to locate the product.
     * @param model MVC model to bind product for editable form.
     * @return Name of the Thymeleaf template for product editing.
     */
    @GetMapping("/product/edit")
    public String editForm(@RequestParam("id") long inputId, Model model) {
        model.addAttribute("product", productService.getProductById(inputId));
        return "product/edit";
    }

    /**
     * Processes POST request for modyfing an existing product.
     * Passes product object to `ProductService` for replacement.
     * 
     * @param product Modified product instance submitted from form.
     * @return Redirect instruction to product list after update.
     */
    @PostMapping("/product/edit")
    public String editSave(@ModelAttribute Product product) {
        productService.updateProduct(product);
        return "redirect:/product/";
    }

    /**
     * Deletes a product based on given ID.
     * Executes removal and refreshes the list page afterwards.
     * 
     * @param inputId Product identifier to remove from the list.
     * @return Redirect instruction to refreshed product list.
     */
    @GetMapping("/product/remove")
    public String remove(@RequestParam("id") long inputId) {
        productService.deleteProductById(inputId);
        return "redirect:/product/";
    }
}
