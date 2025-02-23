package com.developer.employee_management.service.impl;
import com.developer.employee_management.entity.EmployeeEntity;
import com.developer.employee_management.repository.EmployeeRepository;
import com.developer.employee_management.service.EmailService;
import com.developer.employee_management.service.EmployeeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository){
        this.employeeRepository = employeeRepository;
    }
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<EmployeeEntity> findAllEmployee(){
        return employeeRepository.findAll();
    }

    @Override
    public Optional<EmployeeEntity> findById(Long id) {
        return employeeRepository.findById(id);
    }

    @Override
    public EmployeeEntity saveEmployee(EmployeeEntity employeeEntity) {
    	employeeEntity.setCreatedAt(LocalDateTime.now());
    	employeeEntity.setUpdatedAt(LocalDateTime.now());
    	if(employeeEntity.getPassword()==null) {
    		employeeEntity.setPassword("123");
    	}
    	
    	// Hash the password before saving
         employeeEntity.setPassword(passwordEncoder.encode(employeeEntity.getPassword()));
    	
    	// employeeEntity.setRole("USER");
         employeeEntity.setApprovalStatus("PENDING");
         employeeEntity.setAutoApproveTimestamp(LocalDateTime.now().plusHours(12));  
         
         
         // Send Email to Superadmin
         String subject = "New User Registration Request";
         String body = "A new user has signed up on your portal.\n\n" +
                       "Name: " + employeeEntity.getName() + "\n" +
                       "Email: " + employeeEntity.getEmail() + "\n" +
                       "Role: " + employeeEntity.getRole() + "\n" +
                       "Please approve or reject this user from your dashboard.";

         emailService.sendEmail("banikroypritam01@gmail.com", subject, body);
         
    	return employeeRepository.save(employeeEntity);
    }

    @Override
    public EmployeeEntity updateEmployee(Long id, EmployeeEntity updatedEmployee) {
        return employeeRepository.findById(id).map(employee -> {
            employee.setName(updatedEmployee.getName());
            employee.setDesignation(updatedEmployee.getDesignation());
            employee.setEmail(updatedEmployee.getEmail());
            employee.setPhone(updatedEmployee.getPhone());
            employee.setUpdatedAt(LocalDateTime.now());
            return employeeRepository.save(employee);
        }).orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
    
    @Override
    public EmployeeEntity loginUser(String email, String password) {
        EmployeeEntity employeeEntity = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        
        if ( !employeeEntity.getPassword().equals(password)) {
            throw new RuntimeException("Invalid email or password");
        }

        if (employeeEntity.getApprovalStatus().equals("PENDING")) {
            throw new RuntimeException("Account is pending approval by admin");
        }

        return employeeEntity; 
    }

    public EmployeeEntity approveUser(Long id) {
        EmployeeEntity employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        
        employee.setApprovalStatus("APPROVED");
        employee.setApprovalTimestamp(LocalDateTime.now());
        return employeeRepository.save(employee);
    }

    public EmployeeEntity rejectUser(Long id) {
        EmployeeEntity employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        employee.setApprovalStatus("REJECTED");
        return employeeRepository.save(employee);
    }
    
    @Override
    public List<EmployeeEntity> getPendingRequests() {
        return employeeRepository.findByApprovalStatus("PENDING"); 
    }

    @Scheduled(fixedRate = 3600000) 
    public void autoApprovePendingUsers() {
        List<EmployeeEntity> pendingUsers = employeeRepository.findAll();

        for (EmployeeEntity user : pendingUsers) {
            if ("PENDING".equals(user.getApprovalStatus()) && user.getAutoApproveTimestamp().isBefore(LocalDateTime.now())) {
                user.setApprovalStatus("APPROVED");
                user.setApprovalTimestamp(LocalDateTime.now());
                employeeRepository.save(user);
            }
        }
    }

    @Override
    public void saveAll(List<EmployeeEntity> employees) {
        employeeRepository.saveAll(employees);
    }
    
    @Autowired
    private EmailService emailService;

	@Override
	public Optional<EmployeeEntity> findByEmail(String email) {
		
		return Optional.empty();
	}

}
    
   
