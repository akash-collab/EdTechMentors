// src/pages/TestFirestore.js
import React from 'react';
import { createInitialDocument } from '../firebase/firestore';

const TestFirestore = () => {
  const handleCreate = async () => {
    console.log("🚀 Button clicked");
    await createInitialDocument('users', 'demoUser1', {
      name: 'John Doe',
      role: 'mentor',
      email: 'john@example.com',
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Firestore Test Page</h2>
      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Firebase Document
      </button>
    </div>
  );
};

export default TestFirestore;