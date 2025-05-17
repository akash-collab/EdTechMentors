// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../src/components/AdminDashboard';
import DashboardPage from './pages/Admin/DashboardPage';
import UserManagement from './pages/Admin/UserManagement';
import CourseManagement from './pages/Admin/CourseManagement';
import PayoutAutomation from './pages/Admin/PayoutAutomation';
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import MentorDashboardPage from './pages/Mentor/DashboardPage';
import SessionsPage from './pages/Mentor/SessionsPage';
import PayoutsPage from './pages/Mentor/PayoutPage';
import MentorDashboard from './components/MentorDashboard';
import AnalyticsReports from './pages/Admin/AnalyticsReports';
// ... import other pages similarly

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Default route */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/*" element={<AdminDashboard />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="course-management" element={<CourseManagement />} />
          <Route path="payouts" element={<PayoutAutomation />} />
          <Route path="analytics-reports" element={<AnalyticsReports />} />
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
