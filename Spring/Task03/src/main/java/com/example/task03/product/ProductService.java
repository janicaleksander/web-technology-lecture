package com.example.task03.product;


import jakarta.transaction.Transactional;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.example.task03.category.Category;
import com.example.task03.category.CategoryRepository;
import com.example.task03.exception.BusinessException;

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

        Product product = new Product(null, p.getName(), p.getWeight(), p.getPrice(), p.getProductIdx(), category);
        return productRepository.save(product);
    }

    public Product getProductById(Integer id){
        return productRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Product with id " + id + " does not exists"));
    }

    @Transactional
    public Product updateProduct(Product p ){
        if (!categoryRepository.existsByName(p.getCategory().getName())){
            throw new BusinessException("New category you are trying to assign to product does not exists");
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
            Product p1 = new Product(null, "banan", 0.5f, 2, 123456789, new Category(1, "owoce", "K1"));
            Product p2 = new Product(null, "pomidor", 0.3f, 4, 543567876, new Category(2, "warzywa", "K2"));
            Product p3 = new Product(null, "czekolada", 0.5, 10f, 123666777, new Category(3, "slodycze", "K3"));

            productRepository.saveAll(List.of(p1,p2,p3));

        }
    }
 */
}
