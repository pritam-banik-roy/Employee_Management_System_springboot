package com.developer.employee_management.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.developer.employee_management.entity.EmployeeEntity;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Long> {
    Optional<EmployeeEntity> findByEmail(String email); 
    List<EmployeeEntity> findByRole(String role);
    List<EmployeeEntity> findByApprovalStatus(String approvalStatus);
    

}
