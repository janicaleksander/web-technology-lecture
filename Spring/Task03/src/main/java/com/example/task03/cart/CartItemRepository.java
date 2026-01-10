package com.example.task03.cart;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.task03.user.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItemEntity, Integer> {
    List<CartItemEntity> findByUser(User user);
    Optional<CartItemEntity> findByUserAndProductId(User user, Integer productId);
    void deleteByUser(User user);
}
