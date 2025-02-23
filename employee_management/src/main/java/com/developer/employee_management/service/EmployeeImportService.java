package com.developer.employee_management.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.developer.employee_management.entity.EmployeeEntity;
import com.developer.employee_management.repository.EmployeeRepository;

import java.util.List;

@Service
public class EmployeeImportService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public void saveAll(List<EmployeeEntity> employees) {
        employeeRepository.saveAll(employees);
    }
}
