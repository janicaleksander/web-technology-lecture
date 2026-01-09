package com.example.task02;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class Task02Application {

    public static void main(String[] args) {
        try {
            Dotenv dotenv = Dotenv.configure()
                    .directory("./")  // Explicitly set directory
                    .ignoreIfMissing()
                    .load();

            dotenv.entries().forEach(entry -> {
                System.setProperty(entry.getKey(), entry.getValue());
                System.out.println("Loaded: " + entry.getKey());
            });
        } catch (Exception e) {
            System.out.println("Error loading .env file: " + e.getMessage());
            e.printStackTrace();
        }
        SpringApplication.run(Task02Application.class, args);
    }
}