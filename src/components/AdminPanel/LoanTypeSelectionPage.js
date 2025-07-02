import React, { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHead from "./DashboardHead";
import { saveLoanType } from "../api_service";
import { fetchLoanTypes } from "../api_service"; 



{ /* const defaultLoanOptions = [
  { label: "Personal Loan", value: "personal", description: "Loan for personal use" },
  { label: "Business Loan", value: "business", description: "Loan for business purposes" },
  { label: "Home Loan", value: "home", description: "Loan for buying a home" },
  { label: "Auto Loan", value: "auto", description: "Loan for purchasing a vehicle" },
]; */ }

const   LoanTypeSelectionPage = ({ onContinue, canRead = false, canWrite = false }) => {
 

  console.log(canRead+" "+canWrite+"Hiii")
  const location = useLocation();
  const applicationNumber = location.state?.applicationNumber;
  // alert(applicationNumber);


  const [loanOptions, setLoanOptions] = useState([]);
  const [loanType, setLoanType] = useState("");
  const [userType, setUserType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newLoanLabel, setNewLoanLabel] = useState("");
  const [newLoanDescription, setNewLoanDescription] = useState("");

  const navigate = useNavigate();


useEffect(() => {
  const storedUserType = sessionStorage.getItem("role")?.toLowerCase();

  if (!storedUserType) {
    navigate("/login");
    return;
  }


  setUserType(storedUserType);

  const getLoanTypes = async () => {
    try {
      const result = await fetchLoanTypes();

      if (result.success) {
        setLoanOptions(
          result.data.map((item) => ({
            label: item.loanType.replace(/_/g, " ").replace(/\d+$/, "").toUpperCase(), // e.g., "personal_loan_001" → "PERSONAL LOAN"
            value: item.loanType,
            description: item.description,
          }))
        );
      } else {
        console.error("❌ API failed. Falling back to default loan options.");
        //setLoanOptions(defaultLoanOptions);
      }
    } catch (error) {
      console.error("❌ Unexpected error fetching loan types:", error);
      //setLoanOptions(defaultLoanOptions);
    }
  };

  getLoanTypes();
}, [navigate]);


  const handleContinue = async () => {
    if (!canWrite) {
      alert("❌ You don't have permission to continue."+canWrite);
      return;
    }

  if (!loanType) return;

  const selectedLoan = loanOptions.find((loan) => loan.value === loanType);

  if (!selectedLoan) {
    alert("Selected loan type not found.");
    return;
  }

  // ✅ Save to backend using API
  const result = await saveLoanType(selectedLoan.value, selectedLoan.description);

  if (result.success) {
    sessionStorage.setItem("selectedLoanType",selectedLoan.value);

    if (onContinue) {
      onContinue(selectedLoan.value);
    } else {
      if (userType === "admin") {
        navigate("/selection_setup");
      } else {
        if (applicationNumber != null) {
          navigate("/form_steps", { state: { applicationNumber } });
        } else {
          alert("❌ Application number is missing!");
        }
      }

    }
  } else {
    alert("❌ Failed to save loan type: " + result.message);
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
  alert("✅ Loan type added locally. Now click Continue to save it to the backend.");
};


  return (
    <div className="flex min-h-screen pr-6 py-8">
     

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* <DashboardHead /> */}

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


