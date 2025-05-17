import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

const classTypes = ["Regular", "Crash Course", "One-on-One", "Group"];
const PLATFORM_FEE_PERCENT = 10;
const GST_PERCENT = 18;

const PayoutAutomation = () => {
  const [mentors, setMentors] = useState([]);
  const [expandedMentor, setExpandedMentor] = useState(null);
  const [mentorData, setMentorData] = useState({});

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const mentorDoc = await getDoc(doc(db, "users", "mentor"));
        if (mentorDoc.exists()) {
          const emails = mentorDoc.data().users || [];
          setMentors(emails);

          // Init state with any saved data
          const initialData = {};
          for (const email of emails) {
            const payoutDoc = await getDoc(doc(db, "payout", email));
            if (payoutDoc.exists()) {
              const data = payoutDoc.data();
              initialData[email] = {
                hourlyRate: data.hourlyRate || "",
                selectedClasses: data.classTypes || [],
                deductions: data.deductions || 0,
                overrideAmount: data.overrideAmount || "",
              };
            } else {
              initialData[email] = {
                hourlyRate: "",
                selectedClasses: [],
                deductions: 0,
                overrideAmount: "",
              };
            }
          }
          setMentorData(initialData);
        }
      } catch (error) {
        console.error("Error fetching mentors or payout data:", error);
      }
    };

    fetchMentors();
  }, []);

  const toggleExpand = (email) => {
    setExpandedMentor(expandedMentor === email ? null : email);
  };

  const updateMentorData = (email, field, value) => {
    setMentorData((prev) => ({
      ...prev,
      [email]: {
        ...prev[email],
        [field]: value,
      },
    }));
  };

  const calculateFinalPayout = (hourlyRate, deductions = 0) => {
    const rate = parseFloat(hourlyRate);
    if (isNaN(rate)) return 0;

    const fee = (PLATFORM_FEE_PERCENT / 100) * rate;
    const gst = (GST_PERCENT / 100) * rate;
    const totalDeductions = fee + gst + Number(deductions || 0);

    return Math.max(0, rate - totalDeductions).toFixed(2);
  };

  return (
    <div className=" mx-auto mt-8 p-4  rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-[#0D47A1]">Payout Automation</h1>

      {mentors.length === 0 && (
        <p className="text-center text-gray-600">No mentors found.</p>
      )}

      {mentors.map((email) => {
        const data = mentorData[email] || {};
        const finalAmount = data.overrideAmount
          ? data.overrideAmount
          : calculateFinalPayout(data.hourlyRate, data.deductions);

        return (
          <div
            key={email}
            className="bg-white shadow-md rounded-lg p-4 mb-6 border border-[#BBDEFB]"
          >
            <h2
              className="text-lg font-semibold text-[#1565C0] mb-2 cursor-pointer"
              onClick={() => toggleExpand(email)}
            >
              {email}
            </h2>

            {expandedMentor === email && (
              <>
                <div className="mb-4">
                  <label className="block font-medium mb-1">Hourly Rate (INR)</label>
                  <input
                    type="number"
                    value={data.hourlyRate}
                    onChange={(e) =>
                      updateMentorData(email, "hourlyRate", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    placeholder="e.g. 500"
                    min="0"
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-1">Class Types</label>
                  <div className="flex flex-wrap gap-2">
                    {classTypes.map((type) => (
                      <label key={type} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={type}
                          checked={data.selectedClasses?.includes(type)}
                          onChange={(e) => {
                            const current = data.selectedClasses || [];
                            const updated = e.target.checked
                              ? [...current, type]
                              : current.filter((t) => t !== type);
                            updateMentorData(email, "selectedClasses", updated);
                          }}
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-medium mb-1">Platform Fee (%)</label>
                    <input
                      type="text"
                      readOnly
                      className="w-full p-2 border bg-gray-100 rounded"
                      value={`${PLATFORM_FEE_PERCENT}%`}
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">GST (%)</label>
                    <input
                      type="text"
                      readOnly
                      className="w-full p-2 border bg-gray-100 rounded"
                      value={`${GST_PERCENT}%`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-medium mb-1">Deductions (INR)</label>
                    <input
                      type="number"
                      value={data.deductions}
                      onChange={(e) =>
                        updateMentorData(email, "deductions", e.target.value)
                      }
                      className="w-full p-2 border rounded"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Manual Override (INR)</label>
                    <input
                      type="number"
                      value={data.overrideAmount}
                      onChange={(e) =>
                        updateMentorData(email, "overrideAmount", e.target.value)
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Leave blank to auto-calculate"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block font-bold">Final Payable Amount (INR)</label>
                  <p className="p-2 border rounded bg-green-100 text-green-800 font-semibold">
                    ₹ {finalAmount}
                  </p>
                </div>

                <button
                  onClick={async () => {
                    try {
                      const current = mentorData[email];
                      if (!current.hourlyRate) {
                        alert("Hourly rate is required.");
                        return;
                      }

                      const payload = {
                        email,
                        hourlyRate: Number(current.hourlyRate),
                        classTypes: current.selectedClasses,
                        platformFeePercent: PLATFORM_FEE_PERCENT,
                        gstPercent: GST_PERCENT,
                        deductions: Number(current.deductions || 0),
                        finalAmount: Number(finalAmount),
                        overrideAmount: current.overrideAmount
                          ? Number(current.overrideAmount)
                          : null,
                        timestamp: new Date(),
                      };

                      await setDoc(doc(db, "payout", email), payload);
                      alert(`Payout saved for ${email}!`);
                    } catch (error) {
                      console.error("Error saving payout:", error);
                      alert("Failed to save payout.");
                    }
                  }}
                  className="bg-[#1976D2] text-white px-6 py-2 rounded hover:bg-[#1565C0] transition"
                >
                  Submit
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PayoutAutomation;