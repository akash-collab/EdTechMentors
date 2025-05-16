import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { doc, getDoc, setDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("mentor");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Check Firestore for user's email under the selected role
      const docRef = doc(db, "users", role);
      const docSnap = await getDoc(docRef);
      const usersList = docSnap.exists() ? docSnap.data().users || [] : [];

      const emailInFirestore = usersList.includes(email);

      if (!emailInFirestore) {
        setError("You are not registered. Please contact the admin.");
        return;
      }

      // Check Firebase Authentication
      const methods = await fetchSignInMethodsForEmail(auth, email);

      if (methods.length > 0) {
        setError("User already registered. Please login.");
        setTimeout(() => navigate("/login"), 2000); // redirect after 2 seconds
        return;
      }

      // Register user
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E3F2FD]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-[#BBDEFB]">
        <h2 className="text-2xl font-bold mb-6 text-[#0D47A1]">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="mentor">Mentor</option>
            <option value="admin">Admin</option>
          </select>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#1976D2] hover:bg-[#1565C0] text-white py-2 rounded"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-[#1E88E5] underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
