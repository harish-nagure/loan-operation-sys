import React, { useEffect, useState } from "react";
import DashboardHead from "./DashboardHead";
import DashboardSidebar from "./DashboardSidebar";
import { getAllApplicationDetails } from "../api_service"; // adjust if path differs

const SubmittedApplication = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [activeStep, setActiveStep] = useState("Application Details");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllApplicationDetails();
        console.log("✅ Fetched Applications:", response?.data);
        setApplications(response?.data || []);
      } catch (error) {
        console.error("❌ Error fetching application details:", error);
      }
    };

    fetchData();
  }, []);

  // Render details panel
  const renderDetails = () => {
    if (!selectedApp) return <p className="text-gray-500">Select an application to view details.</p>;

    const { applicationDetails = {}, userDetails = {} } = selectedApp;

    return (
      <div className="space-y-2 text-sm text-gray-700">
        {Object.entries(applicationDetails).map(([key, value], idx) => (
          <p key={idx}>
            <strong>{key.replace(/([A-Z])/g, " $1")}: </strong>
            {typeof value === "boolean" ? (value ? "Yes" : "No") : String(value ?? "-")}
          </p>
        ))}
        {Object.entries(userDetails).map(([key, value], idx) => (
          <p key={`user-${idx}`}>
            <strong>{key.replace(/([A-Z])/g, " $1")}: </strong>
            {String(value ?? "-")}
          </p>
        ))}
      </div>
    );
  };

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

          {/* Table */}
          <div className="bg-white p-6 rounded shadow border border-gray-300 mb-8">
            <h2 className="text-xl font-semibold mb-4">All Applications</h2>
            {applications.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border border-collapse border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-4 py-2">Application No</th>
                       <th className="border px-4 py-2"> Name</th>
                       

                         <th className="border px-4 py-2">Email</th>
                         <th className="border px-4 py-2">Phone No.</th>
                        <th className="border px-4 py-2">Monthly Income</th>
                      <th className="border px-4 py-2">Loan Amount</th>
                      <th className="border px-4 py-2">DOB</th>
                      
                      <th className="border px-4 py-2">City</th>
                       <th className="border px-4 py-2">State</th>

                      
                    
                      { /* <th className="border px-4 py-2">SSN</th>
                      <th className="border px-4 py-2">Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
  {applications
    .filter(app => {
      const details = app.applicationDetails ?? app;
      return details.applicationNumber !== null && details.applicationNumber !== undefined && details.applicationNumber !== "";
    })
    .map((app, index) => {
      const details = app.applicationDetails ?? app;
      const user = app.userDetails ?? app;

      const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || "-";

      return (
        <tr
          key={index}
          className={`cursor-pointer hover:bg-gray-50 ${
            selectedApp?.applicationId === (details.applicationId ?? details.id) ? "bg-blue-50" : ""
          }`}
        >
         
          <td className="border px-4 py-2">{details.applicationNumber ?? "-"}</td>
           <td className="border px-4 py-2">{fullName}</td>
          
              <td className="border px-4 py-2">{user.email ?? "-"}</td>
              <td className="border px-4 py-2">{user.phone ?? "-"}</td>
              <td className="border px-4 py-2">{details.monthlyGrossIncome ?? "-"}</td>
                <td className="border px-4 py-2">{details.howMuchDoYouNeed?? "-"}</td>

          <td className="border px-4 py-2">{details.dateOfBirth ?? "-"}</td>
           <td className="border px-4 py-2">{details.city?? "-"}</td>
            <td className="border px-4 py-2">{details.state?? "-"}</td>
          

         
        </tr>
      );
    })}
</tbody>


                </table>
              </div>
            ) : (
              <p className="text-gray-500">No applications found.</p>
            )}
          </div>

          {/* Selected Application Details */}
          {selectedApp && (
            <>
              <div className="mb-4 border-b border-gray-300 flex gap-6 text-sm">
                <div
                  className={`cursor-pointer pb-1 ${
                    activeStep === "Application Details"
                      ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveStep("Application Details")}
                >
                  Application Details
                </div>
              </div>

              <div className="bg-white p-6 rounded shadow border">
                {activeStep === "Application Details" && renderDetails()}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmittedApplication;
