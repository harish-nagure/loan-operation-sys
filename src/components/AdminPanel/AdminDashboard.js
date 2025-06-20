import React from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHead from "./DashboardHead";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <DashboardHead />

        <h1 className="text-3xl font-bold text-gray-800 mb-6">Loan Application</h1>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card title="Open Tasks" icon="📝" value="29" color="blue" />
          <Card title="Open Applications" icon="📂" value="76" color="green" />
          <Card title="Apps expiring in 24 hrs" icon="⏰" value="793" color="red" />
          <Card title="Apps Submitted in last 24 hrs" icon="✅" value="0" color="gray" />
        </div>

        {/* Loan Application Status */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Loan Application Status</h2>

          {/* Rows of Status Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <StatusBox label="Lead" value="19" color="blue" />
            <StatusBox label="Application Submitted" value="4" color="green" />
            <StatusBox label="Verifications" value="5" color="yellow" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <StatusBox label="Pending Approval" value="0" color="gray" />
            <StatusBox label="Offer Generated" value="22" color="purple" />
            <StatusBox label="Agreement Docs Out" value="20" color="indigo" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <StatusBox label="Pre Funding Review" value="9" color="green" />
            <StatusBox label="Funding Approved" value="0" color="orange" />
            <StatusBox label="Funded" value="321" color="blue" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <StatusBox label="Declined" value="92" color="green" />
            <StatusBox label="Unwind" value="0" color="yellow" />
            <StatusBox label="Not interested" value="20" color="green" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatusBox label="Expired" value="793" color="red" />
            
          </div>
        </div>
      </div>
    </div>
  );
};

// Top 4 cards component
const Card = ({ title, icon, value, color }) => (
  <div className="bg-white rounded-lg shadow p-4 border border-gray-200 flex items-center gap-4">
    <div className="text-3xl">{icon}</div>
    <div>
      <div className="text-sm font-semibold text-gray-700">{title}</div>
      <div className={`text-2xl font-bold text-${color}-600`}>{value}</div>
    </div>
  </div>
);

const StatusBox = ({ label, value }) => (
  <div className="bg-white-50 rounded-lg p-4 border border-blue-200">
    <div className="flex justify-between items-center text-sm font-medium text-gray-700">
      <span>{label}</span>
      <div className="ml-2 px-3 py-1 bg-blue-200 text-blue-900 text-sm font-bold rounded-md">
        {value}
      </div>
    </div>
  </div>
);


export default AdminDashboard;
