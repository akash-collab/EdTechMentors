import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

const MentorDashboard = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Replace with your actual logout logic
    console.log("User logged out");
    // Redirect to login
    navigate("/login");
  };

  return (
    <div className="flex h-screen w-screen bg-[#E3F2FD] relative">
      <Sidebar role="mentor" onLogout={() => setShowConfirm(true)} />
      <main className="flex-grow overflow-y-auto">
        <Outlet />
      </main>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to log out?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border-2 border-blue-600 text-blue-600 font-bold rounded-md bg-transparent hover:bg-blue-100"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorDashboard;
