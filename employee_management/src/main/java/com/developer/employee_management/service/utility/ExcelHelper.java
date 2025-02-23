package com.developer.employee_management.service.utility;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.developer.employee_management.entity.EmployeeEntity;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class ExcelHelper {

    public static List<EmployeeEntity> excelToEmployees(InputStream is) {
        List<EmployeeEntity> employees = new ArrayList<>();
        try (Workbook workbook = new XSSFWorkbook(is)) {
            Sheet sheet = workbook.getSheetAt(0);
            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue;  
                EmployeeEntity emp = new EmployeeEntity();
                emp.setName(row.getCell(1).getStringCellValue());
                emp.setEmail(row.getCell(4).getStringCellValue());
                emp.setRole(row.getCell(2).getStringCellValue());
                emp.setPassword(row.getCell(6).getStringCellValue());
                emp.setDesignation(row.getCell(3).getStringCellValue());
                emp.setPhone(row.getCell(5).getStringCellValue());
                
                
                employees.add(emp);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse Excel file: " + e.getMessage());
        }
        return employees;
    }
}

