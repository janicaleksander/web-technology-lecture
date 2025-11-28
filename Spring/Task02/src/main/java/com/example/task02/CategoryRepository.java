package com.example.task02;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Integer> {
    boolean existsByName(String name);
    boolean existsByCode(String code);
    Optional<Category> findByName(String name);
    Optional<Category> findByCode(String code);
}
