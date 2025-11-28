package com.example.task02;

import org.springframework.stereotype.Controller;

@Controller
public class ProductController {
    private final ProductService productService;
    public ProductController(ProductService productService){
        this.productService = productService;
    }
}
