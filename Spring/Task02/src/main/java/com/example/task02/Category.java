package com.example.task02;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.util.Objects;
@Entity
@Table(name = "kategoria")
@Builder
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="nazwa",nullable = false,unique = true)
    @NotBlank
    @Size(min=1, max=255)
    private String name;

    @Column(name="kod",nullable = false,unique = true)
    @NotBlank
    @Size(min=1,max=255)
    private String code;


    public Category(){

    }
    public Category(Integer id, String name, String code){
        this.id = id;
        this.name = name;
        this.code = code;
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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Category category = (Category) o;
        return Objects.equals(id, category.id) && Objects.equals(name, category.name) && Objects.equals(code, category.code);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, code);
    }
}
