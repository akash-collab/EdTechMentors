// src/components/MentorDashboard.js
import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const MentorDashboard = () => {
  return (
    <div className="flex h-screen w-screen bg-[#E3F2FD]">
      <Sidebar role="mentor" />
      <main className="flex-grow overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MentorDashboard;