import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardSidebar from "./DashboardSidebar";
import DashboardHead from "./DashboardHead";

const LoanTypeSelectionPage = () => {
  const [loanType, setLoanType] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!loanType) {
      alert("Please select a loan type.");
      return;
    }

    sessionStorage.setItem("selectedLoanType", loanType);
    navigate("/selection_steps_page");
  };

  return (

    <div className="lg:flex md:block font-inter">
      <div className="h-screen hidden lg:block fixed z-20">
        <DashboardSidebar />
      </div>
      <main className="flex-1 lg:ml-72">
        <DashboardHead />


    <div className="min-h-screen px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full mt-10">
        <h2 className="text-2xl font-semibold mb-6">Select Loan Type</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Loan Type</label>
          <select
            value={loanType}
            onChange={(e) => setLoanType(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="">-- Select Loan Type --</option>
            <option value="personal">Personal Loan</option>
            <option value="business">Business Loan</option>
            <option value="home">Home Loan</option>
            <option value="auto">Auto Loan</option>
          </select>
        </div>

        <button
          onClick={handleContinue}
         className="bg-[#029aaa] text-white px-6 py-2 rounded hover:bg-[#01c4d5] transition flex items-center gap-2"
        >
          Continue
        </button>
      </div>
    </div>

    </main>
  </div>
  );
};

export default LoanTypeSelectionPage;
