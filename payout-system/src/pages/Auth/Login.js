// src/pages/Auth/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Placeholder logic for authentication
    if (email && password) {
      // Navigate to dashboard after login (replace with real auth logic)
      navigate("/dashboard");
    } else {
      setError("Email and password are required.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E3F2FD]">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-[#0D47A1] mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded border-[#90CAF9] focus:outline-none focus:ring-2 focus:ring-[#1976D2]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded border-[#90CAF9] focus:outline-none focus:ring-2 focus:ring-[#1976D2]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#1976D2] hover:bg-[#1565C0] text-white p-3 rounded"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Don’t have an account? <a href="/signup" className="text-[#0D47A1] underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;