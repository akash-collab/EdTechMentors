// src/pages/Admin/AnalyticsReports.js
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import emailjs from "@emailjs/browser";

const AnalyticsReports = () => {
  const [payouts, setPayouts] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [customMessages, setCustomMessages] = useState({});
  const [sendingAll, setSendingAll] = useState(false);

  const platformFee = 10; // Fixed platform fee
  const gstPercentage = 18; // Fixed GST percentage

  useEffect(() => {
    const fetchPayouts = async () => {
      const snapshot = await getDocs(collection(db, "payout"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPayouts(data);
    };
    fetchPayouts();
  }, []);

  const toggleExpand = (email) => {
    setExpanded((prev) => (prev === email ? null : email));
  };

  const calculateFinalPayout = (hourlyRate, totalHours) => {
    const grossAmount = hourlyRate * totalHours;
    const platformFeeAmount = grossAmount * 0.1; // 10% platform fee
    const gstAmount = (grossAmount * gstPercentage) / 100;
    const finalAmount = grossAmount - platformFeeAmount - gstAmount;

    return {
      grossAmount,
      platformFeeAmount,
      gstAmount,
      finalAmount,
    };
  };

  const sendReceiptEmail = (mentor) => {
    const { email, hourlyRate, classTypes, totalHours = 1 } = mentor;

    const { grossAmount, platformFeeAmount, gstAmount, finalAmount } =
      calculateFinalPayout(hourlyRate, totalHours);

    const templateParams = {
      to_email: email,
      mentor_name: email.split("@")[0],
      payout_id: mentor.id,
      hourly_rate: hourlyRate,
      total_hours: totalHours,
      class_types: classTypes.join(", "),
      platform_fee: platformFeeAmount.toFixed(2),
      gst_percentage: gstPercentage,
      gst_amount: gstAmount.toFixed(2),
      total_payout: finalAmount.toFixed(2),
      custom_message:
        customMessages[email] || "Thank you for your valuable mentorship!",
    };

    return emailjs.send(
      "service_1tefeca", // your EmailJS Service ID
      "template_i2n0e9n", // your EmailJS Template ID
      templateParams,
      "iH5I6Arlx9pB-Asur" // your EmailJS User ID (public key)
    );
  };

  const sendEmailToAll = async () => {
    if (sendingAll) return; // prevent double send
    setSendingAll(true);
    for (const mentor of payouts) {
      try {
        await sendReceiptEmail(mentor);
        // Small delay to avoid API rate limits
        await new Promise((res) => setTimeout(res, 1500));
      } catch (error) {
        console.log(`Failed to send receipt to ${mentor.email}: ${error.text}`);
      }
    }
    setSendingAll(false);
    alert("Emails sent to all mentors.");
  };

  const generateAndSend = async (mentor) => {
    try {
      // Simulate receipt generation (you can replace this with real logic)
      alert(`Receipt generated and sent successfully to ${mentor.email}`);
      await sendReceiptEmail(mentor);
      alert(`Receipt sent successfully to ${mentor.email}!`);
    } catch (error) {
      console.log(`Failed to send receipt to ${mentor.email}: ${error.text}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-[#E3F2FD] rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-[#0D47A1] mb-6">
        Analytics & Reports
      </h1>

      {payouts.length === 0 && (
        <p className="text-center text-gray-600">No payout data found.</p>
      )}

      <button
        disabled={sendingAll}
        onClick={sendEmailToAll}
        className={`mb-6 px-8 py-3 rounded-full font-semibold text-white shadow-lg transition-transform transform hover:scale-105 active:scale-95 focus:outline-none ${
          sendingAll
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-[#2196F3] to-[#0D47A1]"
        }`}
      >
        {sendingAll ? "Sending emails..." : "Send Email to All Mentors"}
      </button>

      {payouts.map((mentor) => {
        const { grossAmount, platformFeeAmount, gstAmount, finalAmount } =
          calculateFinalPayout(mentor.hourlyRate, mentor.totalHours || 1);

        return (
          <div
            key={mentor.email}
            className="bg-white border border-[#BBDEFB] rounded-lg p-6 mb-6 shadow"
          >
            <h2
              className="text-lg font-semibold text-[#1565C0] cursor-pointer"
              onClick={() => toggleExpand(mentor.email)}
            >
              {mentor.email}
            </h2>

            {expanded === mentor.email && (
              <div className="mt-4 space-y-3 text-gray-800">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr>
                      <td className="py-1 font-semibold">Hourly Rate</td>
                      <td className="py-1 text-right">₹{mentor.hourlyRate}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-semibold">Total Hours</td>
                      <td className="py-1 text-right">
                        {mentor.totalHours || 1}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 font-semibold">Class Types</td>
                      <td className="py-1 text-right">
                        {mentor.classTypes.join(", ")}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 font-semibold">Gross Amount</td>
                      <td className="py-1 text-right">
                        ₹{grossAmount.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 font-semibold">Platform Fee</td>
                      <td className="py-1 text-right text-red-600">
                        - ₹{platformFeeAmount.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 font-semibold">
                        GST ({gstPercentage}%)
                      </td>
                      <td className="py-1 text-right text-green-600">
                        - ₹{gstAmount.toFixed(2)}
                      </td>
                    </tr>
                    <tr className="border-t-2 border-gray-700 font-bold">
                      <td className="py-1">Final Payout</td>
                      <td className="py-1 text-right">
                        ₹{finalAmount.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <textarea
                  placeholder="Add custom message for the receipt..."
                  className="w-full p-2 border rounded mt-3"
                  onChange={(e) =>
                    setCustomMessages((prev) => ({
                      ...prev,
                      [mentor.email]: e.target.value,
                    }))
                  }
                  value={customMessages[mentor.email] || ""}
                  rows={3}
                />

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() =>
                      sendReceiptEmail(mentor).then(() =>
                        alert(`Receipt sent to ${mentor.email}!`)
                      )
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Send via Email
                  </button>
                  <button
                    onClick={() => generateAndSend(mentor)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    Generate & Send Receipt
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AnalyticsReports;
