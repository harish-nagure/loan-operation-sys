import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHead from "./DashboardHead";

const steps = [
  "Link Bank Account",
  "Document Verification",
  "Accept Offer",
  "Review and Sign Agreement",
  "Funded",
];

const SelectStepsPage = () => {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const toggleStep = (step) => {
    setSelected((prev) =>
      prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step]
    );
  };

  const handleContinue = () => {
    sessionStorage.setItem("selectedSteps", JSON.stringify(selected));
    navigate("/forms_page");
  };

  return (




    <div className="lg:flex md:block font-inter">
      <div className="h-screen hidden lg:block fixed z-20">
        <DashboardSidebar />
      </div>
      <main className="flex-1 lg:ml-72">
        <DashboardHead />

    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl w-full  p-10 md:p-16 overflow-y-auto">
        <h1 className="text-4xl font-bold text-[#029aaa] mb-10 text-center">
          Select Steps
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {steps.map((step) => (
            <label
              key={step}
              className="flex items-center space-x-3 text-gray-700 hover:text-[#029aaa] transition"
            >
              <input
                type="checkbox"
                className="form-checkbox text-[#30c9d6] rounded-md w-5 h-5"
                checked={selected.includes(step)}
                onChange={() => toggleStep(step)}
              />
              <span className="text-lg">{step}</span>
            </label>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleContinue}
            className="w-60 bg-[#029aaa] hover:bg-[#028191] text-white font-semibold py-3 px-4 rounded-lg transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
      </main>
    </div>
  );
};

export default SelectStepsPage;
