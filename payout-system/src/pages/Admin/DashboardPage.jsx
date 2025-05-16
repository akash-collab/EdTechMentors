import React from 'react';

const DashboardPage = () => {
  return (
    <div className="p-6 bg-blueLightest min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-blueDeep">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blueLight rounded-lg shadow p-6 border-l-8 border-brightGreen">
          <h2 className="text-xl font-semibold text-blueDarkest">Total Users</h2>
          <p className="text-3xl font-bold mt-2 text-blueDeep">1234</p>
        </div>

        <div className="bg-blueLight rounded-lg shadow p-6 border-l-8 border-brightOrange">
          <h2 className="text-xl font-semibold text-blueDarkest">Active Courses</h2>
          <p className="text-3xl font-bold mt-2 text-blueDeep">56</p>
        </div>

        <div className="bg-blueLight rounded-lg shadow p-6 border-l-8 border-bluePrimary">
          <h2 className="text-xl font-semibold text-blueDarkest">Scheduled Sessions</h2>
          <p className="text-3xl font-bold mt-2 text-blueDeep">12</p>
        </div>
      </div>

      <section className="bg-blueLighter rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-blueDeep">Recent Activity</h2>
        <ul className="list-disc list-inside text-blueDark">
          <li>User John registered</li>
          <li>Course React Basics added</li>
          <li>Session with mentor Alice scheduled</li>
        </ul>
      </section>
    </div>
  );
};

export default DashboardPage;