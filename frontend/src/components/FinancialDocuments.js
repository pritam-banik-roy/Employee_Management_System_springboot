import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Swal from 'sweetalert2';
import { viewDocumentApi, uploadDocumentApi } from './ApiUrlServie';

function FinancialDocuments() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [documentCount, setDocumentCount] = useState(0);

  const handleFileUpload = (e) => setFile(e.target.files[0]);

  const goBack = () => {
    navigate(-1);
  };

  const logout = () => {
    navigate('/');
  };

  const logoutButtonStyle = {
    backgroundColor: '#E74C3C',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.3s',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !employeeName || !file) return Swal.fire('Error', 'All fields are required!', 'error');
    try {
      const formData = new FormData();
      formData.append('file', file);
      await uploadDocumentApi(userId, formData);
      Swal.fire('Success', 'Document uploaded successfully!', 'success');
      fetchDocuments();
    } catch {
      Swal.fire('Error', 'Upload failed.', 'error');
    }
  };

  const fetchDocuments = async () => {
    try {
      const res = await viewDocumentApi(userId);
      setDocuments(res.data);
      setDocumentCount(res.data.length);
    } catch {
      Swal.fire('Error', 'Failed to fetch documents.', 'error');
    }
  };

  const styles = {
    header: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      backgroundColor: '#34495E',
      color: 'white',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1000,
      boxSizing: 'border-box'
    },
    backButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      padding: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    headerTitle: {
      fontSize: '24px',
      fontWeight: '600',
      color: 'white',
      margin: 0,
      flex: 1,
      textAlign: 'center'
    },
    container: { 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#f0f5fa', 
      borderRadius: '15px', 
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', 
      textAlign: 'center',
      marginTop: '80px'
    },
    input: { 
      padding: '14px', 
      margin: '12px', 
      fontSize: '15px', 
      borderRadius: '8px', 
      border: '1px solid #bbb', 
      width: '280px' 
    },
    button: { 
      padding: '12px 24px', 
      fontSize: '15px', 
      margin: '12px', 
      borderRadius: '8px', 
      backgroundColor: '#2c82c9', 
      color: 'white', 
      border: 'none', 
      cursor: 'pointer', 
      transition: 'background-color 0.3s' 
    },
    list: { 
      padding: 0, 
      marginTop: '24px', 
      listStyle: 'none', 
      textAlign: 'left' 
    },
    item: { 
      marginBottom: '12px', 
      padding: '10px', 
      backgroundColor: '#e1effe', 
      borderRadius: '6px' 
    },
    link: { 
      color: '#155e75', 
      fontWeight: 'bold', 
      textDecoration: 'underline' 
    },
    heading: { 
      color: '#2c3e50', 
      fontSize: '26px', 
      fontWeight: 'bold', 
      marginBottom: '20px' 
    }
  };

  return (
    <>
      <header style={styles.header}>
        <button onClick={goBack} style={styles.backButton}>
          <ArrowLeft size={24} />
        </button>
        <h2 style={styles.headerTitle}>Financial Documents</h2>
        <button 
          onClick={logout} 
          style={logoutButtonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#C0392B'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#E74C3C'}
        >
          Logout
        </button>
      </header>

      <div style={styles.container}>
        <h2 style={styles.heading}>Employee Document Manager</h2>
        <form onSubmit={handleSubmit}>
          <input placeholder="Employee Name" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} style={styles.input} required />
          <input placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} style={styles.input} required />
          <input type="file" onChange={handleFileUpload} style={styles.input} required />
          <button type="submit" style={styles.button}>Upload Document</button>
        </form>
        {documentCount > 0 && <h3 style={{ color: '#1d3557', fontSize: '18px' }}>Documents for {employeeName}: {documentCount}</h3>}
        <button onClick={fetchDocuments} style={{ ...styles.button, backgroundColor: '#16a085' }}>View Documents</button>
        <ul style={styles.list}>
          {documents.map((doc, i) => (
            <li key={i} style={styles.item}>
              <a href={doc.documentUrl} target="_blank" rel="noopener noreferrer" style={styles.link}>View Document {i + 1}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default FinancialDocuments;