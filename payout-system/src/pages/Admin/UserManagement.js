import React, { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../firebase/config";

const UserManagement = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("mentor");
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [emailError, setEmailError] = useState("");

  const roles = ["admin", "mentor"];

  const fetchUsers = async () => {
    const allUsers = [];
    for (const r of roles) {
      const docRef = doc(db, "users", r);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userArray = docSnap.data().users || [];
        userArray.forEach((email) => {
          allUsers.push({ id: email, role: r });
        });
      }
    }
    setUsers(allUsers);
  };

  const addUser = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError("");

    if (!email.trim() || !role) {
      setEmailError("Email and role are required.");
      return;
    }

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      const roleDocRef = doc(db, "users", role);
      const roleDocSnap = await getDoc(roleDocRef);
      const existingUsers = roleDocSnap.exists()
        ? roleDocSnap.data().users || []
        : [];

      if (existingUsers.includes(email)) {
        setEmailError(`This email already exists as a ${role}.`);
        return;
      }

      await setDoc(roleDocRef, { users: arrayUnion(email) }, { merge: true });

      setEmail("");
      setRole("mentor");
      setEmailError("");
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
      setEmailError("Failed to add user. Try again.");
    }
  };

  const deleteUser = async (emailToDelete, userRole) => {
    try {
      const roleDocRef = doc(db, "users", userRole);
      await updateDoc(roleDocRef, {
        users: arrayRemove(emailToDelete),
      });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) => {
    const roleMatch = filter === "All" || u.role === filter.toLowerCase();
    const searchMatch =
      search.trim() === "" ? true : u.id.toLowerCase() === search.toLowerCase(); // exact match when search exists
    return roleMatch && searchMatch;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="bg-[#BBDEFB] p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-[#0D47A1]">
          Add New User
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded border flex-1"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-2 rounded border"
          >
            <option value="mentor">Mentor</option>
            <option value="admin">Admin</option>
          </select>
          <button
            onClick={addUser}
            className="bg-[#1976D2] text-white px-4 py-2 rounded hover:bg-[#1565C0]"
          >
            Add User
          </button>
        </div>
        {emailError && (
          <p className="text-red-600 text-sm mt-2">{emailError}</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
        <h2 className="text-lg font-semibold text-[#0D47A1]">Users</h2>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <input
            type="text"
            placeholder="Search by email"
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              if (value.trim() !== "") {
                setFilter("All"); // reset role filter when typing
              }
              if (value.trim() === "") {
                fetchUsers(); // fetch full list when cleared
              }
            }}
            className="p-2 rounded border"
          />

          {search && (
            <button
              onClick={() => {
                setSearch("");
                setFilter("All");
                fetchUsers(); // refetch full users to reset table
              }}
              className="border border-blue-600 text-blue-600 px-3 py-1 rounded bg-transparent hover:bg-blue-50 transition"
            >
              Clear
            </button>
          )}

          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              if (e.target.value === "All") {
                setSearch(""); // Clear search when 'All' is selected
              }
            }}
            className="p-2 rounded border"
          >
            <option value="All">All</option>
            <option value="Admin">Admin</option>
            <option value="Mentor">Mentor</option>
          </select>
        </div>
      </div>

      <table className="w-full border shadow rounded-xl overflow-hidden">
        <thead className="bg-[#90CAF9] text-left">
          <tr>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="odd:bg-[#E3F2FD] even:bg-white">
              <td className="p-3">{user.id}</td>
              <td className="p-3 capitalize">{user.role}</td>
              <td className="p-3">
                <button
                  onClick={() => deleteUser(user.id, user.role)}
                  className="bg-[#f07167] hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan="3" className="p-3 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
