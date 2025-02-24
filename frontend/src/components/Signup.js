import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';


function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
    designation: '',
    phone: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/employee/register', user); 
      console.log("User registration request sent:", response.data);
      alert("Registration request sent! Your account is pending approval.");
      
      localStorage.setItem('token', response.data);
      navigate('/'); 
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Registration failed!");
    }
  };

  const containerStyle = {
    width: '450px',
    padding: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
    margin: '50px auto',
    fontFamily: 'Arial, sans-serif',
  };

  const inputStyle = {
    width: '100%',
    padding: '14px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: '#f9f9f9',
    boxSizing: 'border-box'
  };

  const passwordContainerStyle = {
    position: 'relative',
    width: '100%'
  };

  const toggleIconStyle = {
    position: 'absolute',
    right: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: '#777'
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: 'bold',
    transition: 'background 0.3s',
  };

  const selectStyle = {
    width: '100%',
    padding: '14px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: '#f8f9fa',
    boxSizing: 'border-box'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#343a40', marginBottom: '20px', fontWeight: 'bold' }}>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <input style={inputStyle} type="text" name="name" placeholder="Full Name" value={user.name} onChange={handleChange} />
        <input style={inputStyle} type="email" name="email" placeholder="Email Address" value={user.email} onChange={handleChange} />
        
    
        <div style={passwordContainerStyle}>
          <input
            style={inputStyle}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
          {showPassword ? (
            <FaEyeSlash style={toggleIconStyle} onClick={() => setShowPassword(false)} />
          ) : (
            <FaEye style={toggleIconStyle} onClick={() => setShowPassword(true)} />
          )}
        </div>

        <input style={inputStyle} type="text" name="designation" placeholder="Designation" value={user.designation} onChange={handleChange} />
        <input style={inputStyle} type="tel" name="phone" placeholder="Phone Number" value={user.phone} onChange={handleChange} />
        <select style={selectStyle} name="role" value={user.role} onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <button style={buttonStyle} type="submit">Sign Up</button>
      </form>
      <p style={{ marginTop: '20px', fontSize: '14px' }}>
        Already have an account? <a href="/" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Login here</a>
      </p>
    </div>
  );
}

export default Signup;
