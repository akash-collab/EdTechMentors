// src/pages/Mentor/components/MentorSummaryCards.js
import React from 'react';

const MentorSummaryCards = () => {
  const cardData = [
    {
      title: 'Total Sessions',
      value: 28,
      bg: '#90CAF9',
    },
    {
      title: 'Upcoming Sessions',
      value: 5,
      bg: '#42A5F5',
    },
    {
      title: 'Total Earnings',
      value: '₹12,500',
      bg: '#38b000',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="rounded-lg shadow-md p-6 text-white"
          style={{ backgroundColor: card.bg }}
        >
          <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
          <p className="text-3xl font-bold">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default MentorSummaryCards;