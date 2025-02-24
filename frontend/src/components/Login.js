import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUserByEmailAndPassword } from './ApiUrlServie';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
        role: "user"
    });
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");

    function handleInputChange(event) {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUserByEmailAndPassword(user);
            if (response.status === 200) {

                const jwttoken='Bearer ' + response.data.token;
                console.log("token ",jwttoken)
                sessionStorage.setItem("jwtToken", jwttoken);

                setMessage("Login successful!");
                //console.log(response.data)
                const userId = response.data.id;

                if (response.data.role === "admin") {
                    navigate('/admin-dashboard', { state: { userId } });
                } else {
                    navigate('/user-dashboard', { state: { userId } });

                }
            } else {
                setMessage("Invalid email or password!");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setMessage("Login failed. Try again!");
        }
    };

    return (
        <div style={loginContainerStyle}>
            <header style={headerStyle}>
                <h1>Employee Management System</h1>
            </header>
            <div style={formContainerStyle}>
                <h3>Login</h3>
                {message && <p style={errorStyle}>{message}</p>}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                />
                
               
                <div style={passwordContainerStyle}>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleInputChange}
                        style={inputStyle}
                        required
                    />
                    {showPassword ? (
                        <FaEyeSlash style={toggleIconStyle} onClick={() => setShowPassword(false)} />
                    ) : (
                        <FaEye style={toggleIconStyle} onClick={() => setShowPassword(true)} />
                    )}
                </div>

                <div style={radioGroupStyle}>
                    <label style={radioLabelStyle}>
                        <input
                            type="radio"
                            name="role"
                            value="admin"
                            onChange={handleInputChange}
                            checked={user.role === 'admin'}
                            style={radioInputStyle}
                        />
                        Admin
                    </label>
                    <label style={radioLabelStyle}>
                        <input
                            type="radio"
                            name="role"
                            value="user"
                            onChange={handleInputChange}
                            checked={user.role === 'user'}
                            style={radioInputStyle}
                        />
                        User
                    </label>
                </div>
                <button onClick={handleSubmit} style={buttonStyle}>Login</button>
                <button onClick={() => navigate('/signup')} style={linkButtonStyle}>Don't have an account? Sign Up</button>
            </div>
        </div>
    );
}

// Styles
const loginContainerStyle = { 
    padding: "40px", 
    backgroundColor: "#f8f9fa", 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center", 
    justifyContent: "center", 
    height: "100vh" 
};
const headerStyle = { 
    backgroundColor: "#2c3e50", 
    color: "#ecf0f1", 
    padding: "15px", 
    width: "100%", 
    textAlign: "center", 
    borderRadius: "5px" 
};
const formContainerStyle = { 
    marginTop: "20px", 
    backgroundColor: "#ffffff", 
    padding: "30px", 
    borderRadius: "8px", 
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
    width: "350px", 
    textAlign: "center" 
};
const inputStyle = { 
    padding: "12px", 
    width: "100%", 
    marginBottom: "15px", 
    borderRadius: "6px", 
    border: "1px solid #bdc3c7", 
    fontSize: "14px", 
    boxSizing: "border-box"
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
    backgroundColor: "#2980b9", 
    color: "white", 
    padding: "12px", 
    border: "none", 
    cursor: "pointer", 
    borderRadius: "6px", 
    width: "100%", 
    fontSize: "16px", 
    marginTop: "10px" 
};
const linkButtonStyle = { 
    backgroundColor: "transparent", 
    color: "#2980b9", 
    padding: "12px", 
    border: "none", 
    cursor: "pointer", 
    borderRadius: "6px", 
    width: "100%", 
    fontSize: "14px", 
    marginTop: "10px", 
    textDecoration: "underline" 
};
const errorStyle = { 
    color: "red", 
    fontSize: "14px", 
    marginBottom: "10px" 
};
const radioGroupStyle = { 
    display: "flex", 
    justifyContent: "center", 
    gap: "20px", 
    marginBottom: "15px" 
};
const radioLabelStyle = { 
    display: "flex", 
    alignItems: "center", 
    gap: "5px", 
    fontSize: "14px" 
};
const radioInputStyle = { 
    cursor: "pointer" 
};

export default Login;
