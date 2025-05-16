// src/pages/Mentor/SessionsPage.js
import React from 'react';
import UpcomingSessions from './UpcomingSessions';

const SessionsPage = () => {
  return (
    <div className="p-6 bg-primaryLight min-h-screen">
      <h2 className="text-3xl font-bold text-primary mb-6">Your Upcoming Sessions</h2>
      <UpcomingSessions />
    </div>
  );
};

export default SessionsPage;