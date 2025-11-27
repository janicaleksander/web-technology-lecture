/*
 * *****************************************************************************
 * @file           : ProductService.java
 * @author         : Alex Rogoziński
 * @brief          : This file contains declarations and definitons of all 
 *                   required operations to be performed on `Product` class 
 *                   objects.
 * *****************************************************************************
 */

package com.example.products;

// -----------------------------------------------------------------------------
// Imports
// -----------------------------------------------------------------------------
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Service class that performs actions on `Product` class objects.
 * Acts as an in-memory data storage and business logic layer.
 * Provides CRUD functionality and ID management.
 * 
 * @author  Alex Rogoziński
 * @version 1.0
 */
@Service
public class ProductService {
    private List<Product> products;
    private long idCounter;

    /**
     * Default constructor.
     */
    public ProductService() { 
        products  = new ArrayList<>();
        idCounter = 1;
    }

    /**
     * Adds two default demonstrative products to the list.
     */
    public void seedProducts() {
        products.add(new Product(getNextId(), "Chleb", 1.0, 5.2, "pieczywo"));
        products.add(new Product(getNextId(), "Masło", 0.25, 7.0, "nabiał"));
    }

    /**
     * Adds product to the list. Ignores previous product ID and replaces 
     * it with new proper calculated value.
     * 
     * @param product A product to added to the list.
     */
    public void addProduct(Product product) {
        product.setId(getNextId());
        products.add(product);
    }


    /**
     * Retrieves a product by its unique identifier.
     * Performs linear search among stored products.
     * 
     * @param id Uniqie product identifier.
     * @return Product instance if found, otherwise `null`.
     */
    public Product getProductById(long id) {
        for (Product product : products) {
            if (product.getId() == id) return product;
        }
        return null;
    }

    /**
     * Updates an existing product entry in the list.
     * Searches for product with matching ID and replaces it.
     * If no match is found, method performs no operation.
     * 
     * @param productUpdated Product instance containing updated fields.
     */
    public void updateProduct(Product productUpdated) {
        for (int i = 0; i < products.size(); i++) {
            if (products.get(i).getId() == productUpdated.getId()) {
                products.set(i, productUpdated);
                return;
            }
        }
    }

    /**
     * Deletes a product based on its unique identifier.
     * If no mathcing product exists, method safely exits without error.
     * 
     * @param id Unique product identifier.
     */
    public void deleteProductById(long id) {
        Product toRemove = getProductById(id);

        if (toRemove == null) return;

        products.remove(toRemove);
    }

    /**
     * Deletes product based on provided product instance.
     * Delegates lookup to `deleteProductById()`.
     * 
     * @param product Product instance to remove.
     */
    public void deleteProduct(Product product) {
        deleteProductById(product.getId());
    }

    /**
     * Returns complete list of stored products.
     * 
     * @return List conatining all products.
     */
    public List<Product> getProducts() { return products; }

    /**
     * Increments the `idCounter` and returns its value.
     * 
     * @return The long integer value of the next product ID.
     */
    private long getNextId() { return idCounter++; }
}
