// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ onLogout, role = 'admin' }) => {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md transition-colors ${
      isActive ? 'bg-primary text-white font-semibold' : 'hover:bg-primaryLight'
    }`;

  const mentorLinks = [
    { path: '/mentor/dashboard', label: 'Dashboard' },
    { path: '/mentor/sessions', label: 'My Sessions' },
    { path: '/mentor/payouts', label: 'Payouts' },
  ];

  const adminLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/user-management', label: 'User & Role Management' },
    { path: '/course-management', label: 'Course Management' },
    { path: '/session-scheduling', label: 'Session Scheduling' },
    { path: '/student-activity', label: 'Student Activity' },
    { path: '/communication-hub', label: 'Communication Hub' },
    { path: '/payouts', label: 'Payout Automation System' },
    { path: '/analytics-reports', label: 'Analytics and Reports' },
    { path: '/platform-settings', label: 'Platform Settings' },
  ];

  const links = role === 'mentor' ? mentorLinks : adminLinks;

  return (
    <div className="w-64 h-screen bg-primaryDark text-white flex flex-col p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-6">{role === 'mentor' ? 'Mentor' : 'Admin'} Panel</h2>
      <ul className="space-y-2 flex-grow">
        {links.map((item) => (
          <li key={item.path}>
            <NavLink to={item.path} className={linkClass}>{item.label}</NavLink>
          </li>
        ))}
      </ul>
      {onLogout && (
        <button
          onClick={onLogout}
          className="mt-auto bg-coral hover:bg-red-600 px-4 py-2 rounded text-white"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Sidebar;