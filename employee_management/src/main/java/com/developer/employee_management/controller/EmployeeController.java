package com.developer.employee_management.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.developer.employee_management.entity.EmployeeEntity;
import com.developer.employee_management.security.AuthResponse;
import com.developer.employee_management.security.CustomUserDetailsService;
import com.developer.employee_management.security.JwtUtil;

import com.developer.employee_management.service.EmployeeService;


@RestController
@RequestMapping("/employee")
public class EmployeeController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private CustomUserDetailsService userDetailsService;
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

    private final  EmployeeService employeeService;
    
    public EmployeeController(EmployeeService employeeService){
        this.employeeService = employeeService;
        
    }

    @GetMapping
    public List<EmployeeEntity> findAllEmployee(){
        return employeeService.findAllEmployee();
    }

    @GetMapping("/{id}")
    public Optional<EmployeeEntity> findEmployeeByID(@PathVariable("id")Long id){
        return employeeService.findById(id);
    }

    @PostMapping("/register")
    public EmployeeEntity saveEmployee(@RequestBody EmployeeEntity employeeEntity){
   	System.out.println("call comming");
   // employeeEntity.setPassword(passwordEncoder.encode(employeeEntity.getPassword()));

       return employeeService.saveEmployee(employeeEntity);
   }
    


    @PutMapping("/{id}")
    public ResponseEntity<EmployeeEntity> updateEmployee(@PathVariable("id") Long id, @RequestBody EmployeeEntity employeeEntity) {
        employeeEntity.setId(id);
        EmployeeEntity updatedEmployee = employeeService.updateEmployee(id, employeeEntity);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable("id")Long id){
        employeeService.deleteEmployee(id);
    }
    
//    @PostMapping("/login")
//    public ResponseEntity<EmployeeEntity> loginUser(@RequestBody LoginRequest request) {
//        EmployeeEntity employeeEntity = employeeService.loginUser(request.getEmail(), request.getPassword());
//        return ResponseEntity.ok().body(employeeEntity);
//    }
    
 
    


    
    @PutMapping("/approve/{id}")
    public ResponseEntity<EmployeeEntity> approveUser(@PathVariable("id") Long id) {
        EmployeeEntity approvedEmployee = employeeService.approveUser(id);
        return ResponseEntity.ok(approvedEmployee);
    }

    @DeleteMapping("/reject/{id}")
    public ResponseEntity<EmployeeEntity> rejectUser(@PathVariable("id") Long id) {
        EmployeeEntity rejectedEmployee = employeeService.rejectUser(id);
        return ResponseEntity.ok(rejectedEmployee);
    }
    
    // pending requests
    @GetMapping("/pending")
    public List<EmployeeEntity> getPendingRequests() {
        return employeeService.getPendingRequests(); 
    }   
    
}