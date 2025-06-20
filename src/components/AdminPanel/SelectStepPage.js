import React, { useState, useEffect, use } from "react";
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
 const userType = sessionStorage.getItem("role")?.toLowerCase();
  const loanType = sessionStorage.getItem("selectedLoanType");
  useEffect(() => {
    const userType = sessionStorage.getItem("role")?.toLowerCase();
    if (userType !== "admin") {
      navigate("/forms_page");
    }
  }, [navigate]);

  const addStep = (step) => {
    // Allow duplicates
    setSelected((prev) => [...prev, step]);
  };

  const clearSteps = () => {
    setSelected([]);
  };

  const handleSubmit = () => {
   

    if (userType === "admin") {
      sessionStorage.setItem("adminSelectedSteps", JSON.stringify(selected));
      sessionStorage.setItem("selectedSteps", JSON.stringify(selected));
      alert("Permission is saved Successfully");
    } else {
      sessionStorage.setItem("selectedSteps", JSON.stringify(selected));
      navigate("/forms_page");
    }
  };

  return (
    <div className="lg:flex md:block font-inter bg-[#f5fcfd] min-h-screen">
      <div className="h-screen hidden lg:block fixed z-20">
        <DashboardSidebar />
      </div>
      <main className="flex-1 lg:ml-72">
        <DashboardHead />

        <div className="p-6 flex items-center justify-center">
          <div className="bg-white shadow-2xl rounded-3xl w-full max-w-5xl p-10 md:p-14">
            <h1 className="text-2xl font-bold text-[#029aaa] mb-8 text-center">
              {loanType.charAt(0).toUpperCase() + loanType.slice(1)} Loan -&gt; Approval Process Flow Setup
            </h1>

            {/* Selected Steps */}
            {selected.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
                  Approval Flow
                </h2>
                <div className="flex items-center justify-center overflow-x-auto px-2">
                  {selected.map((step, index) => (
                    <React.Fragment key={index}>
                      {/* Circle with label */}
                      <div className="flex flex-col items-center min-w-[90px] relative z-10">
                        <div className="w-4 h-4 rounded-full bg-[#029aaa] shadow-sm"></div>
                        <span className="text-xs text-center text-gray-700 mt-2 font-medium leading-tight max-w-[80px]">
                          {step}
                        </span>
                      </div>

                      {/* Line between circles */}
                      {index < selected.length - 1 && (
                        <div className="w-10 h-0.5 bg-[#029aaa] -ml-1 -mr-1 z-0"></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* Step Selection Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
              {steps.map((step) => (
                <button
                  key={step}
                  onClick={() => addStep(step)}
                  className="flex items-center justify-center bg-white border border-gray-300 rounded-xl py-4 px-6 text-gray-700 hover:text-[#029aaa] hover:border-[#029aaa] shadow-sm transition text-lg font-medium"
                >
                  + {step}
                </button>
              ))}
            </div>

            {/* Submit & Clear Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleSubmit}
                className="w-64 bg-[#029aaa] hover:bg-[#028191] text-white font-semibold py-3 rounded-xl transition shadow-lg text-lg"
              >
                Save Permission
              </button>

              <button
                onClick={clearSteps}
                className="w-64 border border-gray-400 text-gray-700 font-semibold py-3 rounded-xl transition hover:bg-gray-100 text-lg"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SelectStepsPage;
