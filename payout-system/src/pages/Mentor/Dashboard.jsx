// src/pages/Mentor/Dashboard.jsx
import React from 'react';
import UpcomingSessions from './UpcomingSessions';
import MentorSummaryCards from './MentorSummaryCards';
import PayoutHistory from './components/PayoutHistory';

const MentorDashboard = () => {
  return (
    <div className="w-full min-h-screen bg-[#E3F2FD] px-8 py-10">
      <h2 className="text-4xl font-bold text-[#0D47A1] mb-10">Mentor Dashboard</h2>

      {/* Summary Cards */}
      <section className="mb-10">
        <MentorSummaryCards />
      </section>

      {/* Upcoming Sessions */}
      <section className="mb-10">
        <UpcomingSessions />
      </section>

      {/* Payout History */}
      <section>
        <PayoutHistory />
      </section>
    </div>
  );
};

export default MentorDashboard;