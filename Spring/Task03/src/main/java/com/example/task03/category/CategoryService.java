package com.example.task03.category;


import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.example.task03.exception.BusinessException;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;
    public CategoryService(){}
    @Transactional
    public Category createCategory(Category c){
        if (categoryRepository.existsByName(c.getName())){
            throw new BusinessException("Category with name " + c.getName() + " does exists");
        }
        if (categoryRepository.existsByCode(c.getCode())){
            throw new BusinessException("Category with code " + c.getCode() + " does exists");
        }
        Category category = new Category(null, c.getName(), c.getCode());
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
            Category c1 = new Category(null, "owoce", "K1");
            Category c2 = new Category(null, "warzywa", "K2");
            Category c3 = new Category(null, "slodycze", "K3");
            categoryRepository.saveAll(List.of(c1,c2,c3));
        }

    }



}
