package com.developer.employee_management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.developer.employee_management.entity.EmployeeEntity;
import com.developer.employee_management.service.EmployeeService;
import com.developer.employee_management.service.utility.ExcelHelper;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeImportController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/import")
    public String uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            List<EmployeeEntity> employees = ExcelHelper.excelToEmployees(file.getInputStream());
            employeeService.saveAll(employees);
            return "File uploaded and data saved successfully!";
        } catch (Exception e) {
            return "Error uploading file: " + e.getMessage();
        }
        
        

    }
}

