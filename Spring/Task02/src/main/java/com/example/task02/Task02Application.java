package com.example.task02;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class Task02Application {

    public static void main(String[] args) {
        try{
            Dotenv dotenv = Dotenv.load();
            dotenv.entries().forEach(entry ->
                    System.setProperty(entry.getKey(),entry.getValue()));
        } catch (Exception e){
            System.out.println("error with loading .env file");
        }
        SpringApplication.run(Task02Application.class, args);
    }

}
