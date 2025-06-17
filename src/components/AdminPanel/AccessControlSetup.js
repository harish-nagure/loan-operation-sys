import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHead from "./DashboardHead";

const AccessControlSetup = () => {
  const [currentUserRole, setCurrentUserRole] = useState("admin");
  const navigate = useNavigate();

  const handleContinue = () => {
    sessionStorage.setItem("selectedRole", currentUserRole);
    navigate("/access_control");
  };

  return (
    <div className="lg:flex md:block font-inter">
      <div className="h-screen hidden lg:block fixed z-20">
        <DashboardSidebar />
      </div>
      <main className="flex-1 lg:ml-72">
        <DashboardHead />
        <div className="min-h-screen bg-gray-100 p-8">
          <div className="bg-white rounded-2xl shadow-lg max-w-2xl mx-auto p-8">
            <h2 className="text-2xl font-bold text-accent mb-6">
              Select Role 
            </h2>
            <div className="mb-6 flex items-center gap-4">
              <label htmlFor="roleSelect" className="font-semibold text-gray-700">
                Role Access:
              </label>
              <select
                id="roleSelect"
                value={currentUserRole}
                onChange={(e) => setCurrentUserRole(e.target.value)}
                className="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleContinue}
                className="bg-accent text-white px-5 py-2 rounded-xl hover:bg-secondary"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccessControlSetup;
