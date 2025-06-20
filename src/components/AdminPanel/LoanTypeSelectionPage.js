import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHead from "./DashboardHead";

const defaultLoanOptions = [
  { label: "Personal Loan", value: "personal", description: "Loan for personal use" },
  { label: "Business Loan", value: "business", description: "Loan for business purposes" },
  { label: "Home Loan", value: "home", description: "Loan for buying a home" },
  { label: "Auto Loan", value: "auto", description: "Loan for purchasing a vehicle" },
];

const LoanTypeSelectionPage = ({ onContinue }) => {
  const [loanOptions, setLoanOptions] = useState([]);
  const [loanType, setLoanType] = useState("");
  const [userType, setUserType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newLoanLabel, setNewLoanLabel] = useState("");
  const [newLoanDescription, setNewLoanDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserType = sessionStorage.getItem("role")?.toLowerCase();
    const savedLoans = JSON.parse(sessionStorage.getItem("loanTypes"));

    console.log("Stored User Type:", storedUserType);

    if (!storedUserType) {
      navigate("/login");
    } else {
      setUserType(storedUserType);
      if (savedLoans) {
        setLoanOptions(savedLoans);
      } else {
        setLoanOptions(defaultLoanOptions);
      }
    }
  }, [navigate]);

  const handleContinue = () => {
    if (!loanType) return;
    sessionStorage.setItem("selectedLoanType", loanType);
    if (onContinue) {
      onContinue(loanType);
    } else {
      // console.log("Selected Loan Type:", userType, loanType);
      navigate(userType === "admin" ? "/selection_steps_page" : "/forms_page");
    }
  };

  const handleAddLoanType = () => {
    if (!newLoanLabel.trim()) return;
    const value = newLoanLabel.toLowerCase().replace(/\s+/g, "_");
    const newLoan = {
      label: newLoanLabel.trim(),
      value,
      description: newLoanDescription.trim(),
    };
    const updatedLoans = [...loanOptions, newLoan];
    setLoanOptions(updatedLoans);
    sessionStorage.setItem("loanTypes", JSON.stringify(updatedLoans));
    setNewLoanLabel("");
    setNewLoanDescription("");
    setShowModal(false);
  };

  return (
    <div className="flex min-h-screen bg-[#f5fcfd]">
      {/* Sidebar */}
      <div className="w-64">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <DashboardHead />

        <div className="p-6">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Select Loan Type
            </h2>

            {/* Loan Type Boxes */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {loanOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => setLoanType(option.value)}
                  className={`cursor-pointer border rounded-xl p-5 text-center shadow-sm transition-all duration-200
                    ${
                      loanType === option.value
                        ? "bg-[#e6f9fb] text-[#029aaa] font-semibold border border-[#029aaa]"
                        : "border-gray-300 hover:bg-gray-100"
                    }
                  `}
                >
                  {option.label}
                </div>
              ))}

              {/* Add Loan Type Widget Button */}
              {userType === "admin" && (
                <div
                  onClick={() => setShowModal(true)}
                  className="cursor-pointer border border-gray-300 rounded-xl p-5 text-center shadow-sm hover:bg-gray-100 transition-all"
                >
                  <div className="text-xl font-semibold">+ Add Loan Type</div>
                  <div className="text-sm text-gray-500">Click to create</div>
                </div>
              )}
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={!loanType}
              className={`w-full py-2 rounded font-medium transition-all
                ${
                  loanType
                    ? "bg-[#029aaa] text-white hover:bg-[#01c4d5]"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }
              `}
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-[#029aaa]">
              Add New Loan Type
            </h3>
            <input
              type="text"
              value={newLoanLabel}
              onChange={(e) => setNewLoanLabel(e.target.value)}
              placeholder="Loan type name"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none"
            />
            <textarea
              value={newLoanDescription}
              onChange={(e) => setNewLoanDescription(e.target.value)}
              placeholder="Loan type description (not displayed)"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddLoanType}
                className="bg-[#029aaa] text-white px-4 py-2 rounded hover:bg-[#01c4d5]"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanTypeSelectionPage;
