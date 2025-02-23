package com.developer.employee_management.security;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.developer.employee_management.security.JwtUtil;
import com.developer.employee_management.security.CustomUserDetailsService;
import com.developer.employee_management.entity.EmployeeEntity;
import com.developer.employee_management.security.AuthResponse;

@RestController
public class JwtAuthenticationController {
	    @Autowired
	    private AuthenticationManager authenticationManager;

	    @Autowired
	    private CustomUserDetailsService customUserDetailsService;

	    @Autowired
	    private JwtUtil jwtUtil;

	 

	    @PostMapping("/authenticate")
	    public ResponseEntity<?> createAuthenticationToken(@RequestBody EmployeeEntity authenticationRequest) throws Exception {
	        try {
	        	
	        	//System.out.println(password);
	        	
	        	
	        	System.out.println(authenticationRequest.getEmail()+ authenticationRequest.getPassword());
	            authenticationManager.authenticate(
	                    new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword())
	            );
	        } catch (BadCredentialsException e) {
	            throw new Exception("Incorrect username or password", e);
	        }

	        final UserDetails userDetails = customUserDetailsService.loadUserByUsername(authenticationRequest.getEmail());
	        final String jwt = jwtUtil.generateToken(userDetails);
	        EmployeeEntity employeeEntity = (EmployeeEntity) userDetails;
	        // Get the user role
	        String role = employeeEntity.getRole();
	        Long userId=employeeEntity.getId();
	       
	        // Return the token and role in the response
	        return ResponseEntity.ok(new AuthResponse(jwt, role,userId));
	        
	    }
	}