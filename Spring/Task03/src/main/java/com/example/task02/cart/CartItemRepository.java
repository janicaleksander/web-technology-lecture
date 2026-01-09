package com.example.task02.cart;

import com.example.task02.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItemEntity, Integer> {
    List<CartItemEntity> findByUser(User user);
    Optional<CartItemEntity> findByUserAndProductId(User user, Integer productId);
    void deleteByUser(User user);
}
