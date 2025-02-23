package com.developer.employee_management.security;

import com.developer.employee_management.entity.EmployeeEntity;



public class AuthResponse {
    
	
	
	  private String token;
	    private String role;
	    
	    private long id;
	    
	    public AuthResponse(String token, String role,long id) {
	        this.token = token;
	        this.role = role;
	        this.id=id;
	    }

		public String getToken() {
			return token;
		}

		public void setToken(String token) {
			this.token = token;
		}

		public String getRole() {
			return role;
		}

		public void setRole(String role) {
			this.role = role;
		}

		public long getId() {
			return id;
		}

		public void setId(long id) {
			this.id = id;
		}
}