package com.developer.employee_management.service;
import com.developer.employee_management.entity.EmployeeEntity;
import java.util.List;
import java.util.Optional;

public interface EmployeeService {
    List<EmployeeEntity> findAllEmployee();
    Optional<EmployeeEntity> findById(Long id);
    EmployeeEntity saveEmployee(EmployeeEntity employeeEntity);
    EmployeeEntity updateEmployee(Long id, EmployeeEntity updatedEmployee);
    void deleteEmployee(Long id);
    EmployeeEntity loginUser(String email, String password);
	EmployeeEntity approveUser(Long id);
	EmployeeEntity rejectUser(Long id);
	List<EmployeeEntity> getPendingRequests();
	void saveAll(List<EmployeeEntity> employees);
	Optional<EmployeeEntity> findByEmail(String email);
	
}



