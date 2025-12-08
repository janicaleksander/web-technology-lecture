package com.example.task02.product;

import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
@RequestMapping("/product")
public class ProductController {
    private final ProductService productService;
    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping()
    public String getProducts(Model model){
        List<Product> products = productService.getAllProducts();
        model.addAttribute("products",products);
        return "products-list";
    }

    @GetMapping("{id}")
    public String getProduct(
            @PathVariable Integer id,
            Model model
    ){
        Product product = productService.getProductById(id);
        model.addAttribute("product",product);
        return "products-info";
    }
    @GetMapping("/new")
    public String newProductForm(
            Model model
    ){
        model.addAttribute("product",new Product());
        model.addAttribute("categories",productService.getAllCategories());
        return "products-new";
    }
    @PostMapping("/new")
    public String newProduct(
            @Valid @ModelAttribute Product product,
            BindingResult result,
            Model model,

            RedirectAttributes redirectAttributes
    ){
        if(result.hasErrors()){
            model.addAttribute("categories", productService.getAllCategories());
            return "products-new";

        }
        productService.createProduct(product);
        redirectAttributes.addFlashAttribute("success","Product " + product.getName() + " added!");
        return "redirect:/product";
    }

    @GetMapping("/edit/{id}")
    public String editProductForm(
            @PathVariable Integer id,
            Model model
    ){

        Product p = productService.getProductById(id);
        model.addAttribute("categories",productService.getAllCategories());
        model.addAttribute("product",p);
        return "products-edit";

    }
    @PostMapping("/edit/{id}")
    public String editProductForm(
            @Valid @ModelAttribute Product product,
            BindingResult result,
            Model model,
            RedirectAttributes redirectAttributes
    ){
        if (result.hasErrors()){
            model.addAttribute("categories", productService.getAllCategories());
            return "products-edit";
        }
        productService.updateProduct(product);
        redirectAttributes.addFlashAttribute("success","Product " + product.getName() + " edited!");
        return "redirect:/product";
    }

    @PostMapping("/delete/{id}")
    public String deleteProduct(
            @PathVariable Integer id,
            RedirectAttributes redirectAttributes
    ){
        productService.deleteProduct(id);
        redirectAttributes.addFlashAttribute("success","Product deleted");
        return "redirect:/product";
    }
}
