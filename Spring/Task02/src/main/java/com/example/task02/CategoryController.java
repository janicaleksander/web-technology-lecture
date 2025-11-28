package com.example.task02;

import jakarta.validation.Path;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
@RequestMapping("/category")
public class CategoryController {
    public final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping()
    public String getCategory(Model model){
        List<Category> category  = categoryService.getAllCategories();
        model.addAttribute("categories",category);
        return "categories-list";
    }
    @GetMapping("/new")
    public String newCategoryForm(Model model){
        model.addAttribute("category", new Category());
        return "categories-new";
    }
    @PostMapping("/new")
    public String newCategory(
            @Valid @ModelAttribute Category category,
            BindingResult result,
            RedirectAttributes redirectAttributes
    ){
        if (result.hasErrors()){
            return "categories-new";
        }
        categoryService.createCategory(category);
        redirectAttributes.addFlashAttribute("success","Kategoria dodana pomyślnie!");
        return "redirect:/category";
    }

    @GetMapping("/edit/{id}")
    public String editCategoryForm(
            @PathVariable Integer id,
            Model model
    ){
        Category c = categoryService.getCategoryById(id);
        model.addAttribute("category",c);
        return "categories-edit";

    }
    @PostMapping("/edit/{id}")
    public String editCategory(
            @Valid @ModelAttribute Category category,
            BindingResult result,
            RedirectAttributes redirectAttributes
    ){
        if (result.hasErrors()){
            return "categories-edit";
        }
        categoryService.updateCategory(category);
        redirectAttributes.addFlashAttribute("success","Kategoria edytowania pomyślnie");
        return "redirect:/category";
    }
    @PostMapping("/delete/{id}")
    public String deleteCategory(
            @PathVariable Integer id,
            RedirectAttributes redirectAttributes
    ){
        categoryService.deleteCategoryById(id);
        redirectAttributes.addFlashAttribute("success","Poprawnie usunięto kategorie");
        return "redirect:/category";
    }

/*    @PostMapping
    public String createCategory(
            @Valid @ModelAttribute Category c,
            BindingResult result,
            Model model,
            RedirectAttributes redirectAttributes){
        if (result.hasErrors()){
            return "///";
        }
        Category category = categoryService.createCategory(c);
        return "";
    }*/

}
