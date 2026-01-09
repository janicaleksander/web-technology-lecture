package com.example.task02.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.ui.Model;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.view.RedirectView;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public RedirectView handleBusinessException(
            BusinessException bE,
            RedirectAttributes redirectAttributes,
            HttpServletRequest request
    ){
        redirectAttributes.addFlashAttribute("exceptionError", bE.getMessage());
        String referer = request.getHeader("Referer");

        return new RedirectView(referer != null ? referer : "/");
    }
    @ExceptionHandler(Exception.class)
    public String handleGenericException(Exception ex, Model model) {
        model.addAttribute("exceptionError", "Unexpected error: " + ex.getMessage());
        return "error";
    }
}