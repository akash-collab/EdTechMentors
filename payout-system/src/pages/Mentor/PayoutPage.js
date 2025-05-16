// src/pages/Mentor/PayoutsPage.js
import React from 'react';
import PayoutHistory from './Payout';

const PayoutsPage = () => {
  return (
    <div className="p-6 bg-primaryLight min-h-screen">
      <h2 className="text-3xl font-bold text-primary mb-6">Your Payout History</h2>
      <PayoutHistory />
    </div>
  );
};

export default PayoutsPage;