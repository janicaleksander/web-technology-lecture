package com.example.task03.cart;

import com.example.task03.user.User;

import jakarta.persistence.*;

@Entity
@Table(name = "cart_items")
public class CartItemEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "product_id", nullable = false)
    private Integer productId;
    
    @Column(name = "product_name", nullable = false)
    private String productName;
    
    @Column(name = "price", nullable = false)
    private Double price;
    
    @Column(name = "quantity", nullable = false)
    private Integer quantity;
    
    public CartItemEntity() {}
    
    public CartItemEntity(Integer id, User user, Integer productId, String productName, Double price, Integer quantity) {
        this.id = id;
        this.user = user;
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
    }

    
    public Integer getId() { return id; }

    public User getUser() { return user; }

    public Integer getProductId() { return productId; }

    public String getProductName() { return productName; }

    public Double getPrice() { return price; }

    public Integer getQuantity() { return quantity; }

    public Double getSubtotal() { return price * quantity; }

    
    public void setId(Integer id) { this.id = id; }
    
    public void setUser(User user) { this.user = user; }
    
    public void setProductId(Integer productId) { this.productId = productId; }
    
    public void setProductName(String productName) { this.productName = productName; }
    
    public void setPrice(Double price) { this.price = price; }
    
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}
