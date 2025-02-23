package com.developer.employee_management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.developer.employee_management.entity.EmployeeDocument;

public interface EmployeeDocumentRepository extends JpaRepository<EmployeeDocument, Integer> {

	List<EmployeeDocument> findByEmployeeEntityId(Long id);

}
