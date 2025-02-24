import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { addNewUserApi, getAllUsersApi, deleteUserApi, updateUserApi } from './ApiUrlServie';

function Dashboard() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

    const [employeeForm, setEmployeeForm] = useState({
        name: '',
        designation: '',
        email: '',
        phone: ''
    });

    const logout = () => {
        navigate('/');
    };

    const goBack = () => {
        navigate(-1);
    };

    const refreshUser = useCallback(() => {
        getAllUsersApi()
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    const deleteEmployee = async (id) => {
        try {
            await deleteUserApi(id);
            refreshUser();
        } catch (error) {
            console.log(error);
        }
    };

    const editEmployee = (id) => {
        const employeeToEdit = employees.find(emp => emp.id === id);
        if (employeeToEdit) {
            setEmployeeForm({
                name: employeeToEdit.name,
                designation: employeeToEdit.designation,
                email: employeeToEdit.email,
                phone: employeeToEdit.phone
            });
            setSelectedEmployeeId(id);
            setIsEditing(true);
            setShowPopup(true);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeForm({
            ...employeeForm,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (isEditing && selectedEmployeeId) {
                const response = await updateUserApi(selectedEmployeeId, employeeForm);
                if (response.data) {
                    alert('Employee updated successfully!');
                    await refreshUser();
                } else {
                    alert('Failed to update employee');
                }
            } else {
                const response = await addNewUserApi(employeeForm);
                if (response.data) {
                    alert('New Employee Added!');
                    await refreshUser(); 
                } else {
                    alert('Failed to add Employee');
                }
            }
            closePopup();
        } catch (error) {
            console.error("Error saving employee:", error);
            alert('An error occurred while saving employee data');
        }
    };

    const openPopup = () => {
        setIsEditing(false);
        setSelectedEmployeeId(null);
        setEmployeeForm({ name: '', designation: '', email: '', phone: '' });
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setIsEditing(false);
        setSelectedEmployeeId(null);
        setEmployeeForm({ name: '', designation: '', email: '', phone: '' });
    };

   
    return (
        <div style={dashboardContainerStyle}>
            <h1 style={globalHeadingStyle}>Employee Management System</h1>

            <header style={headerStyle}>
                <button onClick={goBack} style={backButtonStyle}>
                    <ArrowLeft size={24} />
                </button>
                <h2 style={headerTitleStyle}>Admin-Dashboard</h2>
                <button onClick={logout} style={logoutButtonStyle}>Logout</button>
            </header>

            <div style={employeeTableContainerStyle}>
                <h3 style={tableTitleStyle}>Employee Details</h3>
                <button onClick={openPopup} style={addEmployeeButtonStyle}>+ Add New Employee</button>

                {showPopup && (
                    <div style={popupOverlayStyle}>
                        <div style={popupStyle}>
                            <h2>{isEditing ? 'Edit Employee' : 'Add Employee'}</h2>
                            <form onSubmit={handleSubmit}>
                                <input type="text" name="name" placeholder="Name" value={employeeForm.name} onChange={handleInputChange} required style={inputStyle} />
                                <input type="text" name="designation" placeholder="Designation" value={employeeForm.designation} onChange={handleInputChange} required style={inputStyle} />
                                <input type="email" name="email" placeholder="Email" value={employeeForm.email} onChange={handleInputChange} required style={inputStyle} />
                                <input type="text" name="phone" placeholder="Phone" value={employeeForm.phone} onChange={handleInputChange} required style={inputStyle} />
                                <div style={popupButtonContainer}>
                                    <button type="submit" style={submitButtonStyle}>{isEditing ? 'Update' : 'Add'}</button>
                                    <button type="button" onClick={closePopup} style={cancelButtonStyle}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>Name</th>
                            <th style={thStyle}>Designation</th>
                            <th style={thStyle}>Email</th>
                            <th style={thStyle}>Phone</th>
                            <th style={thStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) => (
                            <tr key={employee.id}>
                                <td style={tdStyle}>{index + 1}</td>
                                <td style={tdStyle}>{employee.name}</td>
                                <td style={tdStyle}>{employee.designation}</td>
                                <td style={tdStyle}>{employee.email}</td>
                                <td style={tdStyle}>{employee.phone}</td>
                                <td style={tdStyle}>
                                    <button onClick={() => editEmployee(employee.id)} style={editButtonStyle}>Edit</button>
                                    <button onClick={() => deleteEmployee(employee.id)} style={deleteButtonStyle}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


// Styles
const dashboardContainerStyle = {
    padding: "30px",
    backgroundColor: "#f4f7fb",
    fontFamily: 'Arial, sans-serif',
    minHeight: "100vh",
    paddingTop: "80px"
};

const globalHeadingStyle = {
    textAlign: "center",
    fontSize: "36px",
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: "30px",
    textTransform: "uppercase",
    letterSpacing: "2px"
};

const headerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#34495E",
    color: "white",
    padding: "15px 30px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box", 
    paddingRight: "20px"  
};

const headerTitleStyle = {
    fontSize: "24px",
    fontWeight: "600",
    color: "white",
    flexGrow: 1,
    textAlign: "center", 
};

const backButtonStyle = {
    backgroundColor: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    padding: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

const logoutButtonStyle = {
    backgroundColor: "#E74C3C",
    color: "white",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "600",
    marginLeft: "auto",
    maxWidth: "120px",  
    whiteSpace: "nowrap", 
    overflow: "hidden",  
};

const employeeTableContainerStyle = {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginTop: "80px"
};

const tableTitleStyle = {
    fontSize: "20px",
    fontWeight: "600",
    color: "#34495E",
    marginBottom: "20px"
};

const addEmployeeButtonStyle = {
    backgroundColor: "#2ECC71",
    color: "white",
    padding: "12px 24px",
    border: "none",
    cursor: "pointer",
    marginBottom: "20px",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "600"
};

const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
};

const thStyle = {
    padding: "10px",
    backgroundColor: "#2980B9",
    color: "white",
    textAlign: "center",
    fontWeight: "600"
};

const tdStyle = {
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "center",
};

const editButtonStyle = {
    backgroundColor: "#3498DB",
    color: "white",
    padding: "8px 16px",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "600",
    transition: "background-color 0.3s",
};

const deleteButtonStyle = {
    backgroundColor: "#E74C3C",
    color: "white",
    padding: "8px 16px",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "600",
    transition: "background-color 0.3s",
};

const popupOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const popupStyle = {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "40%",
    maxWidth: "500px",
    textAlign: "center"
};

const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px"
};

const submitButtonStyle = {
    backgroundColor: "#2ECC71",
    color: "white",
    padding: "12px 24px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "600",
    marginRight: "10px"
};

const cancelButtonStyle = {
    backgroundColor: "#E74C3C",
    color: "white",
    padding: "12px 24px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "600"
};

const popupButtonContainer = {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px"
};

export default Dashboard;