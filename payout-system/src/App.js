// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../src/components/AdminDashboard';
import DashboardPage from './pages/Admin/DashboardPage';
import UserManagement from './pages/Admin/UserManagement';
import CourseManagement from './pages/Admin/CourseManagement';
// ... import other pages similarly

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/*" element={<AdminDashboard />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="course-management" element={<CourseManagement />} />
          {/* add other routes here */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;