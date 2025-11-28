package com.example.task02.exception;

public class BusinessException extends RuntimeException {
    public BusinessException(String message) {
        super(message);
    }
    public BusinessException(String message,Throwable cause){
        super(message,cause);
    }
}
