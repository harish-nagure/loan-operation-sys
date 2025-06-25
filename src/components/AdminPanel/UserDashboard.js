import React from "react";
import DashboardHead from "./DashboardHead";
import DashboardSidebar from "./DashboardSidebar";

const UserDashboard = () => {
  const username = sessionStorage.getItem("username") || "User";
  const loanAmount = "$15,000";
  const approvalId = "APL-9843";
  const dealerName = "ABC Finance Co.";

  const steps = [
    "Application Form",
    "Link Bank Account",
    "Document Verification",
    "Accept Offer",
    "Review and Sign Agreement",
    "Funded",
  ];

  const submittedSteps = JSON.parse(sessionStorage.getItem("submittedSteps")) || [];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <DashboardHead />

        <h1 className="text-2xl font-bold text-gray-800 mb-4 ml-4">Loan and Application</h1>

        <div className="bg-white rounded-xl shadow border border-[#e0f3f4] p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Welcome, {username}
          </h2>

          {/* Loan Details */}
          <div className="mb-4">
            <div className="font-semibold text-sm text-gray-700">Loan Applied</div>
            <div className="text-lg text-green-700">{loanAmount}</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <div className="font-semibold">Approval</div>
              <div className="text-base">{approvalId}</div>
            </div>
            <div>
              <div className="font-semibold">Dealer</div>
              <div className="text-base">{dealerName}</div>
            </div>
          </div>

          {/* Progress Table */}
          <div className="mt-8">
            <div className="font-semibold mb-2 text-gray-700">Application Progress</div>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 text-sm text-left">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 border">Fact</th>
                    <th className="px-4 py-2 border">Status</th>
                    <th className="px-4 py-2 border">Result</th>
                    <th className="px-4 py-2 border">Verified By</th>
                    <th className="px-4 py-2 border">Verified On</th>
                    <th className="px-4 py-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {steps.map((step, idx) => {
                    const isCompleted = submittedSteps.includes(step);
                    return (
                      <tr key={idx} className="bg-white even:bg-gray-50">
                        <td className="px-4 py-2 border">{step}</td>
                        <td className="px-4 py-2 border text-center">
                          {isCompleted ? (
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
                        <td className="px-4 py-2 border">None</td>
                        <td className="px-4 py-2 border">System</td>
                        <td className="px-4 py-2 border">—</td>
                        <td className="px-4 py-2 border">
                          <button className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded">
                            Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
