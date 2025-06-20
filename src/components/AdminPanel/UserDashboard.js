import React from "react";
import DashboardHead from "./DashboardHead";
import DashboardSidebar from "./DashboardSidebar";
import FormHeader from "./FormHeader";

const UserDashboard = () => {
  const username = sessionStorage.getItem("username") || "User";
  const loanAmount = "$15,000";
  const approvalId = "APL-9843";
  const dealerName = "ABC Finance Co.";

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar - static, no fixed or overlap */}
      <div className="w-64 bg-white border-r shadow">
        <DashboardSidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-10">
        {/* Dashboard header */}
        <DashboardHead />

        {/* Page heading OUTSIDE container */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4 ml-4">Loan and Application</h1>

        {/* Main white box container */}
        <div className="bg-white rounded-xl shadow border border-[#e0f3f4] p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome, {username}</h2>

          {/* Loan amount */}
          <div className="mb-4">
            <div className="font-semibold text-sm text-gray-700">Loan Applied</div>
            <div className="text-lg text-green-700">{loanAmount}</div>
          </div>

          {/* Approval & Dealer under loan */}
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

          {/* Form Header */}
          <div className="mt-6">
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
