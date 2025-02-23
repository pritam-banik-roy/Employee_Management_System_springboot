package com.developer.employee_management.entity;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;


@Entity
@Table(name = "mt_employee")
public class EmployeeEntity implements UserDetails {
 

    private static final String PENDING = null;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emp_id")
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "designation")
    private String designation;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;
    
    @Column(name = "role")
    private String role;
    
    
    
    
//    @ManyToOne(FetchType.LAZY)
//    List<EmployeeDocument> files;
//    
    public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	
    @Override
    public String getUsername() {
        return email;
    }
	
	
	@Column(nullable = false)
    private String password;


    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;
    
    @Column(name = "approval_status")
    private String approvalStatus = "PENDING";  // Default status is PENDING

    @Column(name = "approval_timestamp")
    private LocalDateTime approvalTimestamp;

    @Column(name = "auto_approve_timestamp")
    private LocalDateTime autoApproveTimestamp;

    public EmployeeEntity(long id, String name, String designation, String email, String phone) {
        this.id = id;
        this.name = name;
        this.designation = designation;
        this.email = email;
        this.phone = phone;
    }

    public EmployeeEntity() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getApprovalStatus() { return approvalStatus; }
    public void setApprovalStatus(String approvalStatus) { this.approvalStatus = approvalStatus; }

    public LocalDateTime getApprovalTimestamp() { return approvalTimestamp; }
    public void setApprovalTimestamp(LocalDateTime approvalTimestamp) { this.approvalTimestamp = approvalTimestamp; }

    public LocalDateTime getAutoApproveTimestamp() { return autoApproveTimestamp; }
    public void setAutoApproveTimestamp(LocalDateTime autoApproveTimestamp) { this.autoApproveTimestamp = autoApproveTimestamp; }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role));
    }


	@Override
	public boolean isAccountNonExpired() {
		
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		
		return true;
	}

	@Override
	public boolean isEnabled() {
	    return !approvalStatus.equals("PENDING");
	}

}
