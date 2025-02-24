import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getuserByUseridApi, updateUserApi, viewDocumentApi } from "./ApiUrlServie";
import { FaFileAlt, FaSignOutAlt, FaEdit, FaSave, FaEye } from "react-icons/fa";

function UserDashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state?.userId;

    const [userDetails, setUserDetails] = useState({});
    const [editedDetails, setEditedDetails] = useState({});
    const [documents, setDocuments] = useState([]);
    const [showDocuments, setShowDocuments] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const getUserDetails = useCallback(async () => {
        if (!userId) return;
        try {
            const response = await getuserByUseridApi(userId);
            if (response?.data) {
                setUserDetails(response.data);
                setEditedDetails({
                    name: response.data.name,
                    phone: response.data.phone,
                    designation: response.data.designation,
                    
                    email: response.data.email,
                });
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
            alert("Failed to fetch user details.");
        }
    }, [userId]);

    const fetchDocuments = async () => {
        try {
            const response = await viewDocumentApi(userId);
            setDocuments(response.data);
            setShowDocuments(true);
        } catch (error) {
            console.error("Error fetching documents:", error);
            alert("Failed to fetch documents.");
        }
    };

    const handleEditChange = (e) => {
        setEditedDetails({ ...editedDetails, [e.target.name]: e.target.value });
    };

    const saveChanges = async () => {
        try {
            
            const updatedDetails = {
                ...editedDetails,
                createdAt: userDetails.createdAt, 
            };
    
            const response = await updateUserApi(userId, updatedDetails);
            if (response && response.status === 200) {
                setUserDetails(updatedDetails); 
                setIsEditing(false);
                setErrorMessage("");  
                alert("Details updated successfully!");
            } else {
                setErrorMessage("Failed to update details. Please try again.");
            }
        } catch (error) {
            console.error("Error saving changes:", error);
            setErrorMessage("Error saving changes. Please check your input and try again.");
        }
    };
    

    useEffect(() => {
        getUserDetails();
    }, [getUserDetails]);

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <button onClick={() => navigate("/")} style={styles.logoutButton}>
                    <FaSignOutAlt /> Logout
                </button>
                <h2 style={styles.header}>User Dashboard</h2>
                <p style={styles.greeting}>Welcome, {userDetails.name}!</p>

                <div style={styles.detailsContainer}>
                    <h3 style={styles.sectionHeader}>Personal Details</h3>
                    <div style={styles.detailRow}>
                        <strong>Name:</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={editedDetails.name}
                                onChange={handleEditChange}
                                style={styles.input}
                            />
                        ) : (
                            <span>{userDetails.name}</span>
                        )}
                    </div>
                    <div style={styles.detailRow}>
                        <strong>Email:</strong>
                        <span>{userDetails.email}</span>
                    </div>
                    <div style={styles.detailRow}>
                        <strong>Phone:</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="phone"
                                value={editedDetails.phone}
                                onChange={handleEditChange}
                                style={styles.input}
                            />
                        ) : (
                            <span>{userDetails.phone}</span>
                        )}
                    </div>
                    <div style={styles.detailRow}>
                        <strong>Designation:</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                name="designation"
                                value={editedDetails.designation}
                                onChange={handleEditChange}
                                style={styles.input}
                            />
                        ) : (
                            <span>{userDetails.designation}</span>
                        )}
                    </div>
                    <div style={styles.detailRow}>
                        <strong>Account Created:</strong>
                        <span>
                            {userDetails.createdAt ? new Date(userDetails.createdAt).toLocaleString() : "N/A"}
                        </span>
                    </div>
                </div>

                <div style={styles.buttonContainer}>
                    <button onClick={fetchDocuments} style={styles.viewDocumentButton}>
                        <FaEye /> View Documents
                    </button>
                    {isEditing ? (
                        <button onClick={saveChanges} style={styles.saveButton}>
                            <FaSave /> Save
                        </button>
                    ) : (
                        <button onClick={() => setIsEditing(true)} style={styles.editButton}>
                            <FaEdit /> Edit
                        </button>
                    )}
                </div>

                {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

                {showDocuments && (
                    <div style={styles.documentViewer}>
                        <h3>Documents ({documents.length})</h3>
                        <div style={styles.documentGrid}>
                            {documents.map((doc, i) => (
                                <div key={i} style={styles.documentCard}>
                                    <FaFileAlt style={styles.documentIcon} />
                                    <p style={styles.documentName}>Document {i + 1}</p>
                                    <a
                                        href={doc.documentUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={styles.viewLink}
                                    >
                                        View Document
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Styles
const styles = {
    container: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f4f7fb" },
    card: { backgroundColor: "white", width: "600px", padding: "30px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" },
    header: { fontSize: "28px", fontWeight: "600", textAlign: "center", marginBottom: "15px" },
    greeting: { textAlign: "center", fontSize: "18px", marginBottom: "20px" },
    detailsContainer: { marginTop: "20px" },
    sectionHeader: { fontSize: "22px", fontWeight: "500", marginBottom: "15px" },
    detailRow: { display: "flex", justifyContent: "space-between", marginBottom: "15px", alignItems: "center" },
    input: { fontSize: "16px", padding: "5px", width: "60%", borderRadius: "4px", border: "1px solid #ccc" },
    buttonContainer: { marginTop: "20px", textAlign: "center" },
    viewDocumentButton: { backgroundColor: "#27AE60", color: "white", padding: "10px", borderRadius: "5px", cursor: "pointer", border: "none", marginRight: "10px", transition: "0.3s", fontSize: "16px" },
    editButton: { backgroundColor: "#FF9800", color: "white", padding: "10px", borderRadius: "5px", cursor: "pointer", border: "none", marginRight: "10px", transition: "0.3s", fontSize: "16px" },
    saveButton: { backgroundColor: "#4CAF50", color: "white", padding: "10px", borderRadius: "5px", cursor: "pointer", border: "none", transition: "0.3s", fontSize: "16px" },
    logoutButton: { backgroundColor: "#e74c3c", color: "white", padding: "10px", borderRadius: "5px", cursor: "pointer", border: "none", fontSize: "16px", float: "right" },
    documentViewer: { marginTop: "20px", padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "8px" },
    documentGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "10px" },
    documentCard: { backgroundColor: "white", padding: "15px", borderRadius: "5px", boxShadow: "0px 2px 6px rgba(0,0,0,0.1)", textAlign: "center" },
    documentIcon: { fontSize: "24px", color: "#555" },
    documentName: { fontSize: "14px", margin: "5px 0" },
    viewLink: { textDecoration: "none", color: "#007BFF", fontWeight: "bold" },
    errorMessage: { color: "red", textAlign: "center", marginTop: "20px" }
};

export default UserDashboard;
