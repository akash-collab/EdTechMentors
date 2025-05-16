import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ onLogout }) => {
  const linkClass = ({ isActive }) =>
    `block p-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700 font-bold" : ""}`;

  return (
    <nav className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
      <ul className="flex flex-col gap-4 flex-grow">
        <li><NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink></li>
        <li><NavLink to="/user-management" className={linkClass}>User & Role Management</NavLink></li>
        <li><NavLink to="/course-management" className={linkClass}>Course Management</NavLink></li>
        <li><NavLink to="/session-scheduling" className={linkClass}>Session Scheduling</NavLink></li>
        <li><NavLink to="/student-activity" className={linkClass}>Student Activity</NavLink></li>
        <li><NavLink to="/communication-hub" className={linkClass}>Communication Hub</NavLink></li>
        <li><NavLink to="/payout-automation" className={linkClass}>Payout Automation System</NavLink></li>
        <li><NavLink to="/analytics-reports" className={linkClass}>Analytics and Reports</NavLink></li>
        <li><NavLink to="/platform-settings" className={linkClass}>Platform Settings</NavLink></li>
      </ul>
      <button
        onClick={onLogout}
        className="mt-auto bg-red-600 hover:bg-red-700 p-2 rounded"
      >
        Logout
      </button>
    </nav>
  );
};

export default Sidebar;