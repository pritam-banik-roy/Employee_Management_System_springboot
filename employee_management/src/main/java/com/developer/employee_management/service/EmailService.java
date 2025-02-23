package com.developer.employee_management.service;

public interface EmailService {
    void sendEmail(String to, String subject, String body);
}
