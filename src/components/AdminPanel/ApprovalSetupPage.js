import React, { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { getAllApplicationDetails, getRoles, updateApprovalSetup } from "../api_service";
import LoanTypeSelectionPage from "./LoanTypeSelectionPage";

const ApprovalSetupPage = () => {
  const location = useLocation();
  const { selectedLoan } = location.state || {};
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesRes = await getRoles();
        const rolesData = rolesRes?.data || [];
        setRoles(rolesData);
        // console.log("Roles fetched:", selectedLoan);

      } catch (error) {
        console.error("Error fetching roles or application details:", error);
        alert("❌ Failed to fetch approval setup data.");
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (roleId) => {
    setSelectedRoles((prev) => {
   
      const updated = { ...prev };

      if (updated[roleId]) {
        delete updated[roleId];
      } else {
        updated[roleId] = { value: "", roleId: roleId };

        setTimeout(() => {
            const input = document.getElementById(`input-${roleId}`);
            if (input) input.focus();
          }, 0);
        }

      return updated;
    });
  };

  const handleInputChange = (roleId, value) => {
    if (!/^\d*$/.test(value)) return; 
    setSelectedRoles((prev) =>({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        value: value,
      },
    }));
  };

  const handleSubmit = async () => {

    const hasInvalid = Object.entries(selectedRoles).some(
      ([_, { value }]) => value === "" || value === "0"
    );

    if (hasInvalid) {
      alert("❌ Please enter a number greater than 0 for all selected roles.");
      return; 
    }
    const approvalSetup = Object.entries(selectedRoles).map(([roleId, { value }]) => {

      const role = roles.find((r) => r.id === parseInt(roleId));
      
      
      return {
        // roleId: role.id,
        role: role.roleName,
        sequence: Number(value),
      };
    });

    console.log("Submitted JSON:", JSON.stringify(approvalSetup, null, 2));

    const result = await updateApprovalSetup(selectedLoan.value, approvalSetup);
    console.log("Save result:", result);
    if (result.success) {
      sessionStorage.setItem("selectedLoanType", selectedLoan.value);
      alert("✅ Data saved. Check console for JSON output.");
      navigate("/selection_setup");
    } else {
      alert(`❌ Failed to save: ${result.message}`);
    }

  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-[#029aaa] mb-8">
          Approval Setup
        </h2>

        <div className="border border-dashed border-[#01c4d5] p-6 rounded-xl bg-[#f1f9f6] mb-8">
          <h3 className="text-xl font-semibold text-[#029aaa] mb-4">
            All Roles
          </h3>

          {roles.length > 0 ? (
            <ul className="space-y-4 text-gray-800">
              {roles.map((role) => (
                <li
                  key={role.id}
                  className="bg-white shadow-sm rounded-md px-4 py-3 border border-gray-200 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={!!selectedRoles[role.id]}
                      onChange={() => handleCheckboxChange(role.id)}
                      className="accent-[#029aaa] w-5 h-5"
                    />
                    <span className="font-medium">{role.roleName}</span>
                  </div>

                  <input
                    id={`input-${role.id}`}
                    type="number"
                    placeholder="Enter number"
                    className="w-40 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#01c4d5]"
                    disabled={!selectedRoles[role.id]}
                    value={selectedRoles[role.id]?.value}
                    onChange={(e) =>
                      handleInputChange(role.id, e.target.value)
                    }
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-red-500 font-medium">⚠️ No roles found.</p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className={`w-full py-3 rounded-xl font-semibold text-lg transition-all ${
            Object.keys(selectedRoles).length > 0
              ? "bg-[#029aaa] text-white hover:bg-[#01c4d5]"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          disabled={Object.keys(selectedRoles).length === 0}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ApprovalSetupPage;
