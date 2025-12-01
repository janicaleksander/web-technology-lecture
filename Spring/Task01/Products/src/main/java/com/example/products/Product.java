/*
 * *****************************************************************************
 * @file           : Product.java
 * @author         : Alex Rogoziński
 * @brief          : This file contains class representing a product with all 
 *                   required data. 
 * *****************************************************************************
 */

package com.example.products;

/**
 * Class representing a shop product.
 * 
 * @author  Alex Rogoziński
 * @version 1.0
 */
public class Product {
    private long   id;
    private String name;
    private double weight;
    private double price;
    private String category;

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Default constructor. Creates an empty Product object.
     */
    public Product() {}

    /**
     * Parametrized constructor. Creates a Product object with fields
     * initialized with given values.
     * 
     * @param  id       Product's unique identifier.
     * @param  name     Product's name.
     * @param  weight   Product's weight in kilograms.
     * @param  price    Product's price in PLN.
     * @param  category Product's category.
     */
    public Product(long id, String name, double weight, double price, String category) {
        setId(id);
        setName(name);
        setWeight(weight);
        setPrice(price);
        setCategory(category);
    }

    // -------------------------------------------------------------------------
    // Getters
    // -------------------------------------------------------------------------

    /**
     * @return An unique long integer product's identifier.
     */
    public long getId() { return id; }

    /**
     * @return A String form of product's name.
     */
    public String getName() { return name; }

    /**
     * @return A double value of product's weight (in kg).
     */
    public double getWeight() { return weight; }

    /**
     * @return A double value of product's price (in PLN).
     */
    public double getPrice() { return price; }

    /**
     * @return A String form of product's category.
     */
    public String getCategory() { return category; }

    // -------------------------------------------------------------------------
    // Setters
    // -------------------------------------------------------------------------

    /**
     * @param id An unique product's identifier.
     */
    public void setId(long id) { this.id = id; }

    /**
     * @param name What the product is called.
     */
    public void setName(String name) { this.name = name; }

    /**
     * @param weight How much the product's mass is.
     */
    public void setWeight(double weight) {
        if (weight >= 0.0) this.weight = weight; 
    }

    /**
     * @param price How much the product costs.
     */
    public void setPrice(double price) { 
        if (price >= 0.0) this.price = price; 
    }

    /**
     * @param category Category that the product can be found under.
     */
    public void setCategory(String category) { this.category = category; }
}
