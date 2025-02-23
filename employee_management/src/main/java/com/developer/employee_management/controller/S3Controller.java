package com.developer.employee_management.controller;

import com.developer.employee_management.entity.EmployeeDocument;
import com.developer.employee_management.entity.EmployeeEntity;
import com.developer.employee_management.repository.EmployeeDocumentRepository;
import com.developer.employee_management.service.EmployeeService;
import com.developer.employee_management.service.S3Service;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/s3")
public class S3Controller {

    private final S3Service s3Service;
    private final EmployeeService employeeService;
    private final EmployeeDocumentRepository employeeDocumentRepository;

    public S3Controller(S3Service s3Service,EmployeeService employeeService
    		, EmployeeDocumentRepository employeeDocumentRepository) {
        this.s3Service = s3Service;
        this.employeeService=employeeService;
        this.employeeDocumentRepository=employeeDocumentRepository;
    }

    @PostMapping("/upload/{id}")
    public ResponseEntity<String> uploadFile(@PathVariable int id, @RequestParam("file") MultipartFile file) {
        try {
            
            String response = s3Service.uploadFile(file);

            System.out.println("Call comming on doc");
            
            long longValue = id;

            
            Optional<EmployeeEntity> employeeEntity = employeeService.findById(longValue);

            if (!employeeEntity.isPresent()) {
                return ResponseEntity.badRequest().body("Employee not found with id: " + id);
            }

            
            EmployeeDocument employeeDocument = new EmployeeDocument();
            employeeDocument.setDocumentUrl(response);
            employeeDocument.setEmployeeEntity(employeeEntity.get()); 
            
            employeeDocumentRepository.save(employeeDocument);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Upload failed: " + e.getMessage());
        }
    }
    
    @GetMapping("/documents/{id}")
    public ResponseEntity<List<EmployeeDocument>> getUserDocuments(@PathVariable Long id) {
        List<EmployeeDocument> documents = employeeDocumentRepository.findByEmployeeEntityId(id);
        return ResponseEntity.ok(documents);
    }


//    @GetMapping("/files/{fileName}")
//    public ResponseEntity<InputStreamResource> downloadFile(@PathVariable String fileName) throws IOException {
//        InputStream fileContent = s3Service.downloadFile(fileName);
//
//        return ResponseEntity.ok()
//                .contentType(MediaType.parseMediaType("application/pdf"))  // Ensure the content type is PDF
//                .body(new InputStreamResource(fileContent));
//    }
    
  
}
