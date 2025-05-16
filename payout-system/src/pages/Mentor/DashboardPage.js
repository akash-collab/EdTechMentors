// src/pages/Mentor/DashboardPage.js
import React from 'react';
import UpcomingSessions from './UpcomingSessions';
import PayoutHistory from './Payout';

const DashboardPage = () => {
  return (
    <div className="p-6 bg-primaryLight min-h-screen">
      <h2 className="text-2xl font-bold text-primary mb-4">Welcome, Mentor!</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-primary">
          <h3 className="text-lg font-semibold text-gray-700">Next Session</h3>
          <p className="mt-2 text-primaryDark">Tomorrow at 10:00 AM</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-greenAccent">
          <h3 className="text-lg font-semibold text-gray-700">Total Sessions</h3>
          <p className="mt-2 text-primaryDark">32</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-coral">
          <h3 className="text-lg font-semibold text-gray-700">Pending Payouts</h3>
          <p className="mt-2 text-primaryDark">₹8,500</p>
        </div>
      </div>
      
    </div>
  );
};

export default DashboardPage;