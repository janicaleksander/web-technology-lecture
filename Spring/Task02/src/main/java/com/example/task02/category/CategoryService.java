package com.example.task02.category;


import com.example.task02.exception.BusinessException;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;
    public CategoryService(){}
    @Transactional
    public Category createCategory(Category c){
        if (categoryRepository.existsByName(c.getName())){
            throw new BusinessException("Product with name " + c.getName() + " does exists");
        }
        if (categoryRepository.existsByCode(c.getCode())){
            throw new BusinessException("Product with code " + c.getCode() + " does exists");
        }
        Category category = Category.builder()
                .name(c.getName())
                .code(c.getCode())
                .build();
        return categoryRepository.save(category);
    }
    public Category getCategoryById(Integer id){
        return categoryRepository.findById(id).orElseThrow(
                () ->new BusinessException("Category with id " + id + " does not exists")
        );
    }
    public  Category getCategoryByName(String name){
        return categoryRepository.findByName(name).orElseThrow(
                () ->new BusinessException("Category with name " + name + " does not exists")
        );
    }
    public  Category getCategoryByCode(String code){
        return categoryRepository.findByCode(code).orElseThrow(
                () ->new BusinessException("Category with code " + code + " does not exists")
        );
    }

    @Transactional
    public Category updateCategory(Category c){
        Category categoryToUpdate = categoryRepository.findById(c.getId())
                .orElseThrow(()-> new BusinessException("Category with id " + c.getId() + " does not exists"));

        categoryToUpdate.setName(c.getName());
        categoryToUpdate.setCode(c.getCode());

        try{
            categoryRepository.saveAndFlush(categoryToUpdate);
        }catch (DataIntegrityViolationException e){
            throw new BusinessException("Error: " + "probably you are trying to save existing name/code");
        }
        return categoryToUpdate;
    }

    @Transactional
    public void deleteCategoryById(Integer id){
        Category categoryToDelete = categoryRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Category with id " + id + " does not exists"));
        categoryRepository.delete(categoryToDelete);
    }

    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }

    @PostConstruct
    public void seed(){
        if (
                !categoryRepository.existsByCode("K1")
                && !categoryRepository.existsByCode("K2")
                && !categoryRepository.existsByCode("K3"))
        {
            Category c1 = Category.builder()
                    .name("owoce")
                    .code("K1")
                    .build();
            Category c2 = Category.builder()
                    .name("warzywa")
                    .code("K2")
                    .build();
            Category c3 = Category.builder()
                    .name("slodycze")
                    .code("K3")
                    .build();
            categoryRepository.saveAll(List.of(c1,c2,c3));
        }

    }



}
