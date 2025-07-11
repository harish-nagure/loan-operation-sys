import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApprovalSetupPage from "./ApprovalSetupPage";

const ApprovalTypeSelectionPage = ({ onContinue, canRead = false, canWrite = false }) => {
  const [approvalOptions, setApprovalOptions] = useState([
    { label: "SINGLE LEVEL", value: "single_level", description: "Single level approval" },
    { label: "MULTI LEVEL", value: "multi_level", description: "Multi level approval" },
  ]);
  const [approvalType, setApprovalType] = useState("");
  const [userType, setUserType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newApprovalLabel, setNewApprovalLabel] = useState("");
  const [newApprovalDescription, setNewApprovalDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const role = sessionStorage.getItem("role")?.toLowerCase();
    if (!role) {
      navigate("/login");
      return;
    }
    setUserType(role);
  }, [navigate]);

  const handleContinue = () => {
    const role = sessionStorage.getItem("role")?.toLowerCase();
    if (!canWrite && role !== "admin") {
      alert("❌ You don't have permission to continue.");
      return;
    }

    if (!approvalType) return;

    sessionStorage.setItem("selectedApprovalType", approvalType);

    if (onContinue) {
      onContinue(approvalType);
    } else {
      navigate("/approval_setup", { state: { approvalType } });
    }
  };

  const handleAddApprovalType = () => {
    if (!newApprovalLabel.trim()) return;

    const label = newApprovalLabel.trim().toUpperCase();
    const value = newApprovalLabel.toLowerCase().replace(/\s+/g, "_");

    if (approvalOptions.some(option => option.label === label)) {
      alert("❌ Approval type already exists.");
      return;
    }

    const newType = {
      label,
      value,
      description: newApprovalDescription.trim(),
    };

    const updated = [...approvalOptions, newType];
    setApprovalOptions(updated);
    sessionStorage.setItem("approvalTypes", JSON.stringify(updated));
    setNewApprovalLabel("");
    setNewApprovalDescription("");
    setShowModal(false);
    alert("✅ Approval type added locally. Click continue to proceed.");
  };

  return (
    <div className="flex min-h-screen pr-6 py-8">
      <div className="flex-1 flex flex-col">
        <div className="p-6">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Select Approval Type
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {approvalOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => setApprovalType(option.value)}
                  className={`cursor-pointer border rounded-xl p-5 text-center shadow-sm transition-all duration-200
                    ${
                      approvalType === option.value
                        ? "bg-[#f1f9f6] text-[#029aaa] font-semibold border border-[#01c4d5]"
                        : "border-gray-300 hover:bg-gray-100"
                    }
                  `}
                >
                  {option.label}
                </div>
              ))}

              {userType === "admin" && (
                <div
                  onClick={() => setShowModal(true)}
                  className="cursor-pointer border border-gray-300 rounded-xl p-5 text-center shadow-sm hover:bg-gray-100 transition-all"
                >
                  <div className="text-xl font-semibold">+ Add Approval Type</div>
                  <div className="text-sm text-gray-500">Click to create</div>
                </div>
              )}
            </div>

            <button
              onClick={handleContinue}
              disabled={!approvalType}
              className={`w-full py-2 rounded font-medium transition-all
                ${
                  approvalType
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
              Add New Approval Type
            </h3>
            <input
              type="text"
              value={newApprovalLabel}
              onChange={(e) => setNewApprovalLabel(e.target.value)}
              placeholder="Approval type name"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none"
            />
            <textarea
              value={newApprovalDescription}
              onChange={(e) => setNewApprovalDescription(e.target.value)}
              placeholder="Approval type description (optional)"
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
                onClick={handleAddApprovalType}
                className="bg-[#029aaa] text-white px-4 py-2 rounded hover:bg-[#01c4d5]"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      <>
      {/* <ApprovalSetupPage/> */}
      </>
    </div>
  );
};

export default ApprovalTypeSelectionPage;
