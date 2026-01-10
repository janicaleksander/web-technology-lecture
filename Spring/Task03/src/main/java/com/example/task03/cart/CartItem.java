package com.example.task03.cart;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class CartItem {
    private Integer productId;
    private String productName;
    private Double price;
    private Integer quantity;
    
    public CartItem() {}
    
    public CartItem(Integer productId, String productName, Double price, Integer quantity) {
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
    }
    

    public Integer getProductId() { return productId; }

    public String getProductName() { return productName; }

    public Double getPrice() { return price; }

    public Integer getQuantity() { return quantity; }

    @JsonIgnore
    public Double getSubtotal() { return price * quantity; }

    
    public void setProductId(Integer productId) { this.productId = productId; }
    
    public void setProductName(String productName) { this.productName = productName; }
    
    public void setPrice(Double price) { this.price = price; }
    
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}
