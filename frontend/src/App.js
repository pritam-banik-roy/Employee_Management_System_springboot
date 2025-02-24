import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';

import PendingRequestsPage from './components/PendingRequestsPage';
import ImportUserPage from './components/ImportUserPage';
import Dashboard from './components/Dashboard';
import FinancialDocuments from './components/FinancialDocuments';

function App() {
  const appStyle = {
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  };

  return (
    <Router>
      <div style={appStyle}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          
          <Route path="/pending-requests" element={<PendingRequestsPage />} />
          <Route path="/import-user" element={<ImportUserPage />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/financial-documents" element={<FinancialDocuments />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
