package com.example.task02.product;


import com.example.task02.exception.BusinessException;
import com.example.task02.category.Category;
import com.example.task02.category.CategoryRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    final
    ProductRepository productRepository;
    final
    CategoryRepository categoryRepository;
    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository){

        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    public Product createProduct(Product p){

        Category category = categoryRepository.findById(p.getCategory().getId())
                .orElseThrow(() -> new BusinessException("Can't find category with " + p.getCategory().getName() + " name"));

        Product product = Product.builder()
                .name(p.getName())
                .weight(p.getWeight())
                .price(p.getPrice())
                .productIdx(p.getProductIdx())
                .category(category)
                .build();
        return productRepository.save(product);
    }

    public Product getProductById(Integer id){
        return productRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Product with id " + id + " does not exists"));
    }

    @Transactional
    public Product updateProduct(Product p ){
        if (!categoryRepository.existsByName(p.getCategory().getName())){
            throw new BusinessException("New category in product does not exists");
        }
        Product productToUpdate = productRepository.findById(p.getId())
                .orElseThrow(() -> new BusinessException("Product with id " + p.getId() + " does not exists"));
        productToUpdate.setName(p.getName());
        productToUpdate.setWeight(p.getWeight());
        productToUpdate.setPrice(p.getPrice());
        productToUpdate.setProductIdx(p.getProductIdx());
        productToUpdate.setCategory(p.getCategory());
        try {
            productRepository.saveAndFlush(productToUpdate);
        }catch (DataIntegrityViolationException e){
            throw new BusinessException("Error with updating");
        }
        return productToUpdate;
    }

    @Transactional
    public void deleteProduct(Integer id){
        Product productToDelete = productRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Category with id " + id + " does not exists"));
        productRepository.delete(productToDelete);
    }
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

/*    @PostConstruct
    public void seed(){
        if (
                !productRepository.existsById(1) &&
                !productRepository.existsById(2) &&
                !productRepository.existsById(3)
        ){
            Product p1 = Product.builder()
                    .name("banan")
                    .weight(0.5f)
                    .price(2)
                    .productIdx(123456789)
                    .category(new Category(1,"owoce","K1"))
                    .build();
            Product p2 = Product.builder()
                    .name("pomidor")
                    .weight(0.3f)
                    .price(4)
                    .productIdx(543567876)
                    .category(new Category(2,"warzywa","K2"))
                    .build();

            Product p3 = Product.builder()
                    .name("czekolada")
                    .weight(0.5)
                    .price(10f)
                    .productIdx(123666777)
                    .category(new Category(3,"slodycze","K3"))
                    .build();

            productRepository.saveAll(List.of(p1,p2,p3));

        }
    }
 */
}
