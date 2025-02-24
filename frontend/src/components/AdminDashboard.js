import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const logout = () => {
    navigate('/');
  };

  const dashboardContainerStyle = {
    position: 'relative',
    width: '70%',
    padding: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)',
    margin: '40px auto',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  };

  const headerStyle = {
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: '#34495E',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'flex-end',
    zIndex: 1000,
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

  const buttonContainerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '25px',
    width: '100%',
    marginTop: '40px',
  };

  const buttonStyle = {
    padding: '16px',
    backgroundColor: '#2C3E50',
    color: '#fff',
    fontSize: '18px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease-in-out',
    textTransform: 'uppercase',
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: '600',
    color: '#34495E',
    marginBottom: '20px',
  };

  const descriptionStyle = {
    fontSize: '18px',
    color: '#7F8C8D',
    marginBottom: '30px',
  };

  const mainContentStyle = {
    marginTop: '60px',
    width: '100%',
  };

  return (
    <>
      <header style={headerStyle}>
        <button onClick={logout} style={logoutButtonStyle}>Logout</button>
      </header>

      <div style={dashboardContainerStyle}>
        <div style={mainContentStyle}>
          <h2 style={titleStyle}>Admin Dashboard</h2>
          <p style={descriptionStyle}>Welcome, Admin! Choose an option to manage the system.</p>

          <div style={buttonContainerStyle}>
            <button style={buttonStyle} onClick={() => handleNavigation('/dashboard')}>
              List of User Info
            </button>

            <button style={buttonStyle} onClick={() => handleNavigation('/pending-requests')}>
              Pending Requests
            </button>

            <button style={buttonStyle} onClick={() => handleNavigation('/import-user')}>
              Import User via Uploading Document
            </button>

            <button style={buttonStyle} onClick={() => handleNavigation('/financial-documents')}>
              User Financial Documents
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;