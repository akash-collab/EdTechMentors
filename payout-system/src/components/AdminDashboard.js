// src/components/AdminDashboard.js
import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const handleLogout = () => {
    // Your logout logic here
    console.log("Logged out");
  };

  return (
    <div className="flex h-screen">
      <Sidebar onLogout={handleLogout} />
      <main className="flex-grow p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;