// src/pages/Mentor/Payout.js
import React from 'react';
import html2pdf from 'html2pdf.js';

const payouts = [
  {
    id: 1,
    amount: 8500,
    date: '2025-05-15',
    status: 'Pending',
  },
  {
    id: 2,
    amount: 12000,
    date: '2025-05-01',
    status: 'Paid',
  },
  {
    id: 3,
    amount: 7800,
    date: '2025-04-15',
    status: 'Paid',
  },
];

const generatePDF = (payout) => {
  const element = document.createElement('div');
  element.innerHTML = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #0D47A1;">Payout Receipt</h2>
      <p><strong>Date:</strong> ${payout.date}</p>
      <p><strong>Amount:</strong> ₹${payout.amount.toLocaleString()}</p>
      <p><strong>Status:</strong> ${payout.status}</p>
      <hr style="margin: 20px 0;" />
      <p>Thank you for your valuable contributions as a mentor!</p>
    </div>
  `;
  const opt = {
    margin: 0.5,
    filename: `receipt_${payout.date}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };
  html2pdf().set(opt).from(element).save();
};

const generateAllReceiptsPDF = () => {
  const wrapper = document.createElement('div');

  payouts.forEach((payout) => {
    const section = document.createElement('div');
    section.innerHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px; page-break-after: always;">
        <h2 style="color: #0D47A1;">Payout Receipt</h2>
        <p><strong>Date:</strong> ${payout.date}</p>
        <p><strong>Amount:</strong> ₹${payout.amount.toLocaleString()}</p>
        <p><strong>Status:</strong> ${payout.status}</p>
        <hr style="margin: 20px 0;" />
        <p>Thank you for your valuable contributions as a mentor!</p>
      </div>
    `;
    wrapper.appendChild(section);
  });

  const opt = {
    margin: 0.5,
    filename: 'all_receipts.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };
  html2pdf().set(opt).from(wrapper).save();
};

const Payout = () => {
  return (
    <div className="p-6 bg-[#E3F2FD] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#0D47A1]">Payout History</h2>
        <button
          onClick={generateAllReceiptsPDF}
          className="bg-[#1E88E5] hover:bg-[#1565C0] text-white px-4 py-2 rounded-lg shadow text-sm"
        >
          Download All Receipts
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-[#90CAF9] text-[#0D47A1]">
            <tr>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((payout) => (
              <tr key={payout.id} className="border-t">
                <td className="px-6 py-4">{payout.date}</td>
                <td className="px-6 py-4">₹{payout.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`font-semibold ${payout.status === 'Paid' ? 'text-green-600' : 'text-orange-600'}`}>
                    {payout.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => generatePDF(payout)}
                    className="bg-[#1976D2] hover:bg-[#1565C0] text-white px-3 py-1 rounded shadow text-sm"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payout;