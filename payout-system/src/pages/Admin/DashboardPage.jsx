import React from 'react';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-[#E3F2FD] p-8">
      <h1 className="text-4xl font-bold text-[#0D47A1] mb-10">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#64B5F6] text-white p-6 rounded-2xl shadow-md border-l-8 border-[#38b000]">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-3xl font-bold mt-2">1,234</p>
        </div>

        <div className="bg-[#42A5F5] text-white p-6 rounded-2xl shadow-md border-l-8 border-[#f07167]">
          <h2 className="text-xl font-semibold">Active Courses</h2>
          <p className="text-3xl font-bold mt-2">56</p>
        </div>

        <div className="bg-[#2196F3] text-white p-6 rounded-2xl shadow-md border-l-8 border-[#1976D2]">
          <h2 className="text-xl font-semibold">Scheduled Sessions</h2>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#BBDEFB] p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-[#0D47A1] mb-4">Recent Activity</h2>
        <ul className="list-disc list-inside text-[#1565C0] space-y-2">
          <li>User John registered</li>
          <li>Course “React Basics” added</li>
          <li>Session with mentor Alice scheduled</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;