import React, { useEffect, useState } from "react";
import DashboardHead from "./DashboardHead";
import DashboardSidebar from "./DashboardSidebar";

const SubmittedApplication = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [formSteps, setFormSteps] = useState({});
  const [activeStep, setActiveStep] = useState("Link Bank Account");

  const stepKeys = {
    "Application Form":"ApplicationForm",
    "Link Bank Account": "linkedBankDetails",
    "Document Verification": "documentVerification",
    "Accept Offer": "acceptedLoanOffer",
    "Review and Sign Agreement": "signedAgreement",
    Funded: "fundedInfo",
  };

  useEffect(() => {
    const userList = JSON.parse(sessionStorage.getItem("userList")) || [];
    setAllUsers(userList);
  }, []);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    const stepsData = {};
    Object.values(stepKeys).forEach((key) => {
      const stepData = sessionStorage.getItem(`${key}_${userId}`);
      if (stepData) {
        stepsData[key] = JSON.parse(stepData);
      }
    });
    setFormSteps(stepsData);
    setActiveStep("Application Form");
  };

  const renderStepDetails = () => {
    const data = formSteps[stepKeys[activeStep]];
    if (!data) return <p className="text-gray-500">No data available.</p>;

    return (
      <div className="space-y-2 text-sm text-gray-700">
        {Object.entries(data).map(([key, value], idx) => (
          <p key={idx}>
            <strong>{key.replace(/([A-Z])/g, " $1")}: </strong>
            {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
          </p>
        ))}
      </div>
    );
  };

  const renderStatusTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border border-collapse border-gray-300">
        <thead className="bg-blue-50 text-blue-700">
          <tr>
            <th className="border px-4 py-2">Fact</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Result</th>
            <th className="border px-4 py-2">Verified By</th>
            <th className="border px-4 py-2">Verified On</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(stepKeys).map(([label, key], index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{label}</td>
             <td className="border px-4 py-2 text-center">
  {formSteps[key] ? (
    <span className="text-green-600 text-lg">✅</span>
  ) : (
    <span
      className="inline-block text-gray-500 text-lg"
      style={{ animation: "spin 2s linear infinite" }}
    >
      ⏳
    </span>
  )}
</td>

              <td className="border px-4 py-2">None</td>
              <td className="border px-4 py-2">System</td>
              <td className="border px-4 py-2">-</td>
              <td className="border px-4 py-2">
                <button className="text-blue-600 underline">Detail</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64">
        <DashboardSidebar />
      </div>

      {/* Main content */}
      <div className="flex-1">
        <DashboardHead />
        <div className="p-10">
          <h1 className="text-2xl font-bold mb-6 text-blue-700">Submitted Applications</h1>

          {/* User List Table */}
          <div className="bg-white p-6 rounded shadow border border-gray-300 mb-8">
            <h2 className="text-xl font-semibold mb-4">User List</h2>
            {allUsers.length > 0 ? (
              <table className="min-w-full text-sm border border-collapse border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2">User ID</th>
                    <th className="border px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((userId, index) => (
                    <tr
                      key={index}
                      onClick={() => handleUserClick(userId)}
                      className={`cursor-pointer hover:bg-gray-50 ${
                        selectedUserId === userId ? "bg-blue-50" : ""
                      }`}
                    >
                      <td className="border px-4 py-2">{userId}</td>
                      <td className="border px-4 py-2 text-green-600">Application Submitted</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No users found in session.</p>
            )}
          </div>

          {/* Selected User Details */}
          {selectedUserId && (
            <>
              <div className="bg-white p-6 rounded shadow border border-gray-200 mb-6">
                <h2 className="text-xl font-bold mb-3">User Details</h2>
                <p><strong>User ID:</strong> {selectedUserId}</p>
                <p><strong>Status:</strong> Application Submitted</p>
              </div>

              {/* Step Tabs */}
              <div className="mb-4 border-b border-gray-300 flex gap-6 text-sm">
                {[
                  "Application Form",
                  "Link Bank Account",
                  "Document Verification",
                  "Accept Offer",
                  "Review and Sign Agreement",
                  "Funded",
                  "Status",
                ].map((step) => (
                  <div
                    key={step}
                    className={`cursor-pointer pb-1 ${
                      activeStep === step
                        ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                        : "text-gray-600"
                    }`}
                    onClick={() => setActiveStep(step)}
                  >
                    {step}
                  </div>
                ))}
              </div>

              {/* Step Content */}
              <div className="bg-white p-6 rounded shadow border">
                {activeStep === "Status" ? renderStatusTable() : renderStepDetails()}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmittedApplication;
