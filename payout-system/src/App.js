// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import MentorDashboard from './components/MentorDashboard';
import DashboardPage from './pages/Admin/DashboardPage';
import UserManagement from './pages/Admin/UserManagement';
import CourseManagement from './pages/Admin/CourseManagement';
import MentorDashboardPage from './pages/Mentor/DashboardPage';
import SessionsPage from './pages/Mentor/SessionsPage';
import PayoutsPage from './pages/Mentor/PayoutPage';
// import other mentor pages as needed

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* Admin routes */}
        <Route path="/*" element={<AdminDashboard />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="course-management" element={<CourseManagement />} />
          {/* Add other admin routes */}
        </Route>

        {/* Mentor routes */}
        <Route path="/mentor/*" element={<MentorDashboard />}>
          <Route path="dashboard" element={<MentorDashboardPage />} />
          <Route path="sessions" element={<SessionsPage />} />
          <Route path="payouts" element={<PayoutsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;