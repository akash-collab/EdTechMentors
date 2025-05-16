// src/pages/Mentor/UpcomingSessions.js
import React from 'react';

const sessions = [
  {
    id: 1,
    topic: "React Hooks Deep Dive",
    date: "2025-05-20",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    topic: "Firebase Integration",
    date: "2025-05-22",
    time: "2:00 PM",
    status: "Scheduled",
  },
  {
    id: 3,
    topic: "Advanced JavaScript",
    date: "2025-05-24",
    time: "5:00 PM",
    status: "Scheduled",
  },
];

const UpcomingSessions = () => {
  return (
    <div className="bg-[#BBDEFB] rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-semibold text-[#0D47A1] mb-4">Upcoming Sessions</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="bg-white rounded-lg shadow p-4 border-l-4 border-[#42A5F5] hover:shadow-lg transition"
          >
            <h4 className="text-lg font-bold text-[#1976D2]">{session.topic}</h4>
            <p className="text-gray-700 mt-2">
              <strong>Date:</strong> {session.date}
            </p>
            <p className="text-gray-700">
              <strong>Time:</strong> {session.time}
            </p>
            <span
              className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
                session.status === "Confirmed"
                  ? "bg-[#38b000] text-white"
                  : "bg-[#f07167] text-white"
              }`}
            >
              {session.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingSessions;