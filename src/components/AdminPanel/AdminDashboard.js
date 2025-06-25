import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHead from "./DashboardHead";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const getApplications = () => {
    const sessionUserList = JSON.parse(sessionStorage.getItem("userList")) || [];

    return sessionUserList.map((id, index) => ({
      id: id,
      name: `User ${index + 1}`,
      status: "Application Submitted"
    }));
  };

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    setApplications(getApplications());
  }, []);

  const handleStatusClick = (status) => {
    if (status === "Application Submitted") {
      navigate("/submitted_application");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 sm:p-10 overflow-x-auto">
        <DashboardHead />

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Loan Application</h1>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card title="Open Tasks" icon="📝" value="0" color="blue" />
            <Card title="Open Applications" icon="📂" value="0" color="green" />
            <Card title="Apps expiring in 24 hrs" icon="⏰" value="0" color="red" />
            <Card title="Apps Submitted in last 24 hrs" icon="✅" value="0" color="gray" />
          </div>

          {/* Status Section */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Loan Application Status</h2>
            {[
              ["Application Submitted", "Lead", "Verifications"],
              ["Pending Approval", "Offer Generated", "Agreement Docs Out"],
              ["Pre Funding Review", "Funding Approved", "Funded"],
              ["Declined", "Unwind", "Not interested"],
              ["Expired"]
            ].map((row, i) => (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4" key={i}>
                {row.map((status) => (
                  <StatusBox
                    key={status}
                    label={status}
                    value={applications.filter(app => app.status === status).length}
                    onClick={handleStatusClick}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, icon, value, color }) => (
  <div className="bg-white rounded-lg shadow p-4 border border-gray-200 flex items-center gap-4">
    <div className="text-3xl">{icon}</div>
    <div>
      <div className="text-sm font-semibold text-gray-700">{title}</div>
      <div className={`text-2xl font-bold text-${color}-600`}>{value}</div>
    </div>
  </div>
);

const StatusBox = ({ label, value, onClick }) => (
  <div
    onClick={() => onClick(label)}
    className="bg-white rounded-lg p-4 border border-blue-200 cursor-pointer hover:shadow-md transition"
  >
    <div className="flex justify-between items-center text-sm font-medium text-gray-700">
      <span>{label}</span>
      <div className="ml-2 px-3 py-1 bg-blue-200 text-blue-900 text-sm font-bold rounded-md">
        {value}
      </div>
    </div>
  </div>
);

export default AdminDashboard;
