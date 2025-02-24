import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getPendingRequestsApi, approveRequestApi, rejectRequestApi } from './ApiUrlServie';

function PendingRequestsPage() {
  const navigate = useNavigate();
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const response = await getPendingRequestsApi();
      setPendingRequests(response.data);
    } catch (error) {
      console.error("Error fetching pending requests:", error);
    }
  };

  const approveRequest = async (id) => {
    try {
      await approveRequestApi(id);
      setPendingRequests(prev => prev.filter(req => req.id !== id));
      alert('User approved!');
    } catch (error) {
      console.error("Error approving user:", error);
      alert('Error approving user!');
    }
  };

  const rejectRequest = async (id) => {
    try {
      await rejectRequestApi(id);
      setPendingRequests(prev => prev.filter(req => req.id !== id));
      alert('User rejected!');
    } catch (error) {
      console.error("Error rejecting user:", error);
      alert('Error rejecting user!');
    }
  };

  const logout = () => {
    navigate('/');
  };

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      pendingRequests.forEach(request => {
        if (request.approvalTimestamp) {
          const approvalTime = new Date(request.approvalTimestamp);
          const now = new Date();
          if (now - approvalTime >= 12 * 60 * 60 * 1000 && request.status.toLowerCase() === 'pending') {
            approveRequest(request.id);
          }
        }
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [pendingRequests]);

  // Styles
  const headerStyle = {
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: '#34495E',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
  };

  const backButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const headerTitleStyle = {
    color: 'white',
    margin: 0,
    fontSize: '24px',
    fontWeight: '600',
    flex: 1,
    textAlign: 'center'
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

  const pageContainerStyle = {
    width: '80%',
    padding: '30px',
    backgroundColor: '#f9f9f9',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    margin: '50px auto',
    marginTop: '100px',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle = {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#333',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thStyle = {
    padding: '15px',
    backgroundColor: '#4A90E2',
    color: 'white',
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '8px 8px 0 0',
  };

  const tdStyle = {
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'center',
    fontSize: '14px',
    color: '#555',
  };

  const trStyle = {
    transition: 'background-color 0.3s ease',
    borderRadius: '8px',
  };

  const trHoverStyle = {
    backgroundColor: '#f1f1f1',
  };

  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '8px',
    fontSize: '14px',
    margin: '5px',
    transition: 'background-color 0.3s ease',
  };

  const approveButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#4CAF50',
    color: 'white',
  };

  const rejectButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f44336',
    color: 'white',
  };

  const buttonHoverStyle = {
    backgroundColor: '#357a38',
  };

  const rejectButtonHoverStyle = {
    backgroundColor: '#c1351d',
  };

  return (
    <>
      <header style={headerStyle}>
        <button onClick={goBack} style={backButtonStyle}>
          <ArrowLeft size={24} />
        </button>
        <h2 style={headerTitleStyle}>Pending Requests</h2>
        <button onClick={logout} style={logoutButtonStyle}>Logout</button>
      </header>

      <div style={pageContainerStyle}>
        <h2 style={titleStyle}>Pending Requests</h2>

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map(request => (
              <tr
                key={request.id}
                style={trStyle}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = trHoverStyle.backgroundColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td style={tdStyle}>{request.id}</td>
                <td style={tdStyle}>{request.name}</td>
                <td style={tdStyle}>{request.email}</td>
                <td style={tdStyle}>{request.status}</td>
                <td style={tdStyle}>
                  <button
                    onClick={() => approveRequest(request.id)}
                    style={approveButtonStyle}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectRequest(request.id)}
                    style={rejectButtonStyle}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = rejectButtonHoverStyle.backgroundColor}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f44336'}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PendingRequestsPage;