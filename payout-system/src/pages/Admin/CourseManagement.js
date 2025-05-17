import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config.js'; 
import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc, // ✅ ADDED THIS LINE
  setDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

const CourseManagement = () => {
  const [mentorEmails, setMentorEmails] = useState([]);
  const [selectedMentorEmail, setSelectedMentorEmail] = useState('');
  const [courses, setCourses] = useState([]);
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    duration: '',
    category: '',
    datetime: '',
  });
  const [editingCourseId, setEditingCourseId] = useState(null);

  const categoryList = [
    'Mathematics', 'Science', 'Programming', 'Design', 'Marketing', 'Business', 'Languages',
  ];

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const mentorDocRef = doc(db, 'users', 'mentor');
        const mentorDocSnap = await getDoc(mentorDocRef);
        if (mentorDocSnap.exists()) {
          const data = mentorDocSnap.data();
          const mentorList = data.users || [];
          setMentorEmails(mentorList);
        } else {
          console.warn('No mentor document found in Firestore.');
          setMentorEmails([]);
        }
      } catch (err) {
        console.error('Error fetching mentor emails:', err);
      }
    };

    fetchMentors();
  }, []);

  const loadCourses = async (email) => {
    setSelectedMentorEmail(email);
    const courseSnapshot = await getDocs(collection(db, 'courses', email, 'courses'));
    const fetchedCourses = courseSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCourses(fetchedCourses);
  };

  const handleChange = (e) => {
    setCourseForm({ ...courseForm, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setCourseForm({ title: '', description: '', duration: '', category: '', datetime: '' });
    setEditingCourseId(null);
  };

  const handleAddOrUpdateCourse = async () => {
    const courseRef = collection(db, 'courses', selectedMentorEmail, 'courses');
    if (editingCourseId) {
      const courseDoc = doc(db, 'courses', selectedMentorEmail, 'courses', editingCourseId);
      await updateDoc(courseDoc, courseForm);
    } else {
      await addDoc(courseRef, courseForm);
    }
    await loadCourses(selectedMentorEmail);
    resetForm();
  };

  const handleEdit = (course) => {
    setCourseForm(course);
    setEditingCourseId(course.id);
  };

  const handleDelete = async (courseId) => {
    await deleteDoc(doc(db, 'courses', selectedMentorEmail, 'courses', courseId));
    await loadCourses(selectedMentorEmail);
  };

  return (
    <div className="p-6 bg-[#E3F2FD] min-h-screen">
      <h2 className="text-3xl font-bold text-[#1565C0] mb-4">📚 Course Management</h2>

      {!selectedMentorEmail ? (
        <div className="bg-white p-6 rounded-lg shadow-md  mx-auto">
          <h3 className="text-xl mb-4 text-[#1976D2]">Select Mentor</h3>
          <ul className="space-y-2">
            {mentorEmails.map(email => (
              <li
                key={email}
                onClick={() => loadCourses(email)}
                className="cursor-pointer px-4 py-2 bg-[#BBDEFB] hover:bg-[#90CAF9] rounded-lg text-[#0D47A1] font-medium transition"
              >
                {email}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedMentorEmail('')}
            className="mb-4 text-sm bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            ← Back to mentor list
          </button>

          {/* Course Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-[#1976D2] mb-4">
              {editingCourseId ? '✏️ Edit Course' : '➕ Add New Course'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {['title', 'description', 'duration'].map((field) => (
                <input
                  key={field}
                  name={field}
                  value={courseForm[field]}
                  onChange={handleChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  type={field === 'duration' ? 'number' : 'text'}
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#90CAF9]"
                />
              ))}

              <select
                name="category"
                value={courseForm.category}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#90CAF9]"
              >
                <option value="">Select Category</option>
                {categoryList.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <input
                name="datetime"
                type="datetime-local"
                value={courseForm.datetime}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#90CAF9]"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddOrUpdateCourse}
                className={`px-4 py-2 rounded-lg text-white ${
                  editingCourseId ? 'bg-[#f07167]' : 'bg-[#1976D2]'
                } hover:opacity-90`}
              >
                {editingCourseId ? 'Update Course' : 'Add Course'}
              </button>
              {editingCourseId && (
                <button
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Course Table */}
          <div className="overflow-x-auto max-w-6xl mx-auto">
            <table className="w-full border-collapse rounded-lg shadow-sm">
              <thead>
                <tr className="bg-[#90CAF9] text-white">
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Duration</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Date & Time</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">No courses yet.</td>
                  </tr>
                ) : (
                  courses.map((course, i) => (
                    <tr key={course.id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F1F8FF]'}>
                      <td className="p-3">{course.title}</td>
                      <td className="p-3">{course.duration}</td>
                      <td className="p-3">{course.category}</td>
                      <td className="p-3">{course.datetime?.replace('T', ' ')}</td>
                      <td className="p-3 space-x-2">
                        <button onClick={() => handleEdit(course)} className="px-3 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 rounded">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(course.id)} className="px-3 py-1 text-sm bg-red-500 text-white hover:bg-red-600 rounded">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;