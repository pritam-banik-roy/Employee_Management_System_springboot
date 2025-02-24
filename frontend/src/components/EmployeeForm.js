// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// function EmployeeForm() {
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [employee, setEmployee] = useState({
//         id: '',
//         name: '',
//         designation: '',
//         email: '',
//         phone: ''
//     });

//     useEffect(() => {
//         if (id) {
//             const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
//             const selectedEmployee = storedEmployees.find(emp => emp.id === parseInt(id));
//             if (selectedEmployee) {
//                 setEmployee(selectedEmployee);
//             }
//         }
//     }, [id]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEmployee({ ...employee, [name]: value });
//     };

//     const handleSave = () => {
//         const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
//         if (id) {
//             const updatedEmployees = storedEmployees.map(emp =>
//                 emp.id === parseInt(id) ? employee : emp
//             );
//             localStorage.setItem('employees', JSON.stringify(updatedEmployees));
//         } else {
//             const newEmployee = { ...employee, id: storedEmployees.length + 1 };
//             storedEmployees.push(newEmployee);
//             localStorage.setItem('employees', JSON.stringify(storedEmployees));
//         }
//         navigate('/dashboard');
//     };

//     return (
//         <div style={formContainerStyle}>
//             <header style={headerStyle}>
//                 <h1>Employee Management System</h1>
//             </header>
//             <div style={formContentStyle}>
//                 <h3>{id ? 'Edit Employee' : 'Add Employee'}</h3>
//                 <input
//                     type="text"
//                     name="id"
//                     value={employee.id}
//                     onChange={handleChange}
//                     placeholder="Employee ID"
//                     style={inputStyle}
//                     disabled={id ? true : false}
//                 />
//                 <input
//                     type="text"
//                     name="name"
//                     value={employee.name}
//                     onChange={handleChange}
//                     placeholder="Employee Name"
//                     style={inputStyle}
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="designation"
//                     value={employee.designation}
//                     onChange={handleChange}
//                     placeholder="Designation"
//                     style={inputStyle}
//                     required
//                 />
//                 <input
//                     type="email"
//                     name="email"
//                     value={employee.email}
//                     onChange={handleChange}
//                     placeholder="Email"
//                     style={inputStyle}
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="phone"
//                     value={employee.phone}
//                     onChange={handleChange}
//                     placeholder="Phone"
//                     style={inputStyle}
//                     required
//                 />
//                 <button onClick={handleSave} style={saveButtonStyle}>Save Employee</button>
//                 <button onClick={() => navigate('/dashboard')} style={cancelButtonStyle}>Cancel</button>
//             </div>
//         </div>
//     );
// }

// const formContainerStyle = {
//     padding: "20px",
//     backgroundColor: "#f4f4f9"
// };

// const formContentStyle = {
//     marginTop: "20px"
// };

// const inputStyle = {
//     padding: "10px",
//     width: "300px",
//     margin: "10px 0",
//     borderRadius: "5px",
//     border: "1px solid #ddd"
// };

// const saveButtonStyle = {
//     backgroundColor: "#4CAF50",
//     color: "white",
//     padding: "10px 20px",
//     border: "none",
//     cursor: "pointer",
//     borderRadius: "5px"
// };

// const cancelButtonStyle = {
//     backgroundColor: "#ff4d4d",
//     color: "white",
//     padding: "10px 20px",
//     border: "none",
//     cursor: "pointer",
//     borderRadius: "5px",
//     marginLeft: "10px"
// };

// export default EmployeeForm;
