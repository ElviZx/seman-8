import React from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Common/Navbar';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Welcome, {user?.full_name}!</h1>
        <div className="dashboard-cards">
          <div className="card">
            <h3>Your Profile</h3>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>
          </div>
          
          <div className="card">
            <h3>Quick Actions</h3>
            <button className="btn-secondary">View Profile</button>
            {user?.role === 'admin' && (
              <button className="btn-secondary">Admin Panel</button>
            )}
            <button onClick={logout} className="btn-danger">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;