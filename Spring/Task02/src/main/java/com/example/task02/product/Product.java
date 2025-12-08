package com.example.task02.product;

import com.example.task02.category.Category;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Builder;

@Entity
@Table(name = "produkt")
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="nazwa",nullable = false)
    @NotBlank
    @Size(min=1,max=255)
    private String name;

    @Column(name="waga",nullable = false)
    @NotNull
    @Positive
    private double weight;


    @Column(name="cena",nullable = false)
    @NotNull
    @Positive
    private double price;

    @Column(name="indeks_produktu",nullable = false)
    @NotNull
    @Positive
    private Integer productIdx;

    @ManyToOne
    @JoinColumn(name = "kategoria",nullable = false)
    @NotNull
    private Category category;

    public Product() {

    }
    public Product(Integer id, String name, double weight, double price, Integer productIdx, Category category) {
        this.id = id;
        this.name = name;
        this.weight = weight;
        this.price = price;
        this.productIdx = productIdx;
        this.category = category;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Integer getProductIdx() {
        return productIdx;
    }

    public void setProductIdx(Integer productIdx) {
        this.productIdx = productIdx;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
