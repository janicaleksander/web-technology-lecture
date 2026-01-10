package com.example.task03.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @NotBlank(message = "Nazwa użytkownika jest wymagana")
    @Size(min = 3, max = 50, message = "Nazwa użytkownika musi mieć od 3 do 50 znaków")
    @Column(unique = true, nullable = false)
    private String username;
    
    @NotBlank(message = "Hasło jest wymagane")
    @Size(min = 6, message = "Hasło musi mieć co najmniej 6 znaków")
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String role; // "ROLE_USER" or "ROLE_ADMIN"
    
    public User() {}
    
    public User(Integer id, String username, String password, String role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }
    
    
    public Integer getId() { return id; }

    public String getUsername() { return username; }

    public String getPassword() { return password; }

    public String getRole() { return role; }
    
    public void setId(Integer id) { this.id = id; }
    
    
    public void setUsername(String username) { this.username = username; }
    
    public void setPassword(String password) { this.password = password; }
    
    public void setRole(String role) { this.role = role; }
}
