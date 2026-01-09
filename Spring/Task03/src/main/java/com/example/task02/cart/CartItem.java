package com.example.task02.cart;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {
    private Integer productId;
    private String productName;
    private Double price;
    private Integer quantity;
    
    @JsonIgnore
    public Double getSubtotal() {
        return price * quantity;
    }
}
