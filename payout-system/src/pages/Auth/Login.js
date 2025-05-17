import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const LoginPage = () => {
  const [role, setRole] = useState("mentor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    try {
      const userDocRef = doc(db, "users", role); // users/mentor or users/admin
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        const emailList = data.users || []; // access the 'users' array field
        const normalizedEmail = email.trim().toLowerCase();

        const emailExistsInRole = emailList
          .map((e) => e.toLowerCase())
          .includes(normalizedEmail);

        if (emailExistsInRole) {
          try {
            await signInWithEmailAndPassword(auth, normalizedEmail, password);
            if (role === "mentor") {
              navigate("/mentor");
            } else {
              navigate("/dashboard");
            }
          } catch (authError) {
            setError(
              "Account exists in system but is not yet registered. Please sign up."
            );
          }
        } else {
          setError(
            "Email not found under selected role. Please contact admin."
          );
        }
      } else {
        setError("Role not found in database. Please contact admin.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("An unexpected error occurred. Please try again.");
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
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border rounded border-[#90CAF9] focus:outline-none focus:ring-2 focus:ring-[#1976D2]"
          >
            <option value="mentor">Mentor</option>
            <option value="admin">Admin</option>
          </select>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#1976D2] hover:bg-[#1565C0] text-white p-3 rounded"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <a href="/signup" className="text-[#0D47A1] underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
