import React, { useEffect, useState } from "react";
import DashboardHead from "./DashboardHead";
import DashboardSidebar from "./DashboardSidebar";
import { getAllApplicationDetails, getApplicationDetailsByNumber, deleteApplicationByNumber } from "../api_service";

const SubmittedApplication = (canRead = false, canWrite = false) => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [linkedBankAccount, setLinkedBankAccount] = useState(null);
  const [activeStep, setActiveStep] = useState("Application Details");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const handleDelete = async (applicationNumber) => {
    if (!window.confirm(`Are you sure you want to delete application ${applicationNumber}?`)) return;

    const res = await deleteApplicationByNumber(applicationNumber);
    if (res && res.status === 200) {
      alert(`✅ ${res.message}`);
      setApplications(prev => prev.filter(app => {
        const details = app.applicationDetails ?? app;
        return details.applicationNumber !== applicationNumber;
      }));
    } else {
      alert("❌ Failed to delete application.");
    }
  };

  const filteredApps = applications.filter(app => {
    const details = app.applicationDetails ?? app;
    return details.applicationNumber;
  });
  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentApps = filteredApps.slice(startIdx, startIdx + itemsPerPage);

  const renderDetails = () => {
    if (!selectedApp) return <p className="text-gray-500">Select an application to view details.</p>;
    const { applicationDetails = {}, userDetails = {} } = selectedApp;
    return (
      <div className="space-y-2 text-sm text-gray-700">
        {Object.entries(applicationDetails).map(([key, value], idx) => (
          <p key={idx}><strong>{key.replace(/([A-Z])/g, " $1")}: </strong>{typeof value === "boolean" ? (value ? "Yes" : "No") : String(value ?? "-")}</p>
        ))}
        {Object.entries(userDetails).map(([key, value], idx) => (
          <p key={`user-${idx}`}><strong>{key.replace(/([A-Z])/g, " $1")}: </strong>{String(value ?? "-")}</p>
        ))}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {/* <DashboardSidebar />

      <div className="flex-1">
        <DashboardHead /> */}

        <div className="p-10">
          <h1 className="text-2xl font-bold mb-6 text-blue-700">Submitted Applications</h1>
          <div className="bg-white p-6 rounded shadow border border-gray-300 mb-8">
            <h2 className="text-xl font-semibold mb-4">All Applications</h2>
            {currentApps.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border border-collapse border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-4 py-2">Application No</th>
                      <th className="border px-4 py-2">Name</th>
                      <th className="border px-4 py-2">Email</th>
                      <th className="border px-4 py-2">Phone No.</th>
                      <th className="border px-4 py-2">Monthly Income</th>
                      <th className="border px-4 py-2">Loan Amount</th>
                      <th className="border px-4 py-2">DOB</th>
                      <th className="border px-4 py-2">City</th>
                      <th className="border px-4 py-2">State</th>
                      <th className="border px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentApps.map((app, index) => {
                      const details = app.applicationDetails ?? app;
                      const user = app.userDetails ?? app;
                      const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || "-";
                      return (
                        <tr
                          key={index}
                          className={`cursor-pointer hover:bg-gray-50 ${
                            selectedApp?.applicationId === (details.applicationId ?? details.id) ? "bg-blue-50" : ""
                          }`}
                          onClick={async () => {
                            sessionStorage.setItem("selectedApplicationNumber", details.applicationNumber);
                            const res = await getApplicationDetailsByNumber(details.applicationNumber);
                            if (res && res.status === 200) setSelectedApp(res.data);
                            else console.error("Failed to load details for:", details.applicationNumber);

                            // Fetch linked bank account too
                            // const bankRes = await getLinkedBankAccount(details.applicationNumber);
                            // if (bankRes && bankRes.status === 200) {
                            //   setLinkedBankAccount(bankRes.data);
                            // } else {
                            //   setLinkedBankAccount(null);
                            // }
                          }}
                        >
                          <td className="border px-4 py-2">{details.applicationNumber ?? "-"}</td>
                          <td className="border px-4 py-2">{fullName}</td>
                          <td className="border px-4 py-2">{user.email ?? "-"}</td>
                          <td className="border px-4 py-2">{user.phone ?? "-"}</td>
                          <td className="border px-4 py-2">{details.monthlyGrossIncome ?? "-"}</td>
                          <td className="border px-4 py-2">{details.howMuchDoYouNeed ?? "-"}</td>
                          <td className="border px-4 py-2">{details.dateOfBirth ?? "-"}</td>
                          <td className="border px-4 py-2">{details.city ?? "-"}</td>
                          <td className="border px-4 py-2">{details.state ?? "-"}</td>
                          <td className="border px-4 py-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(details.applicationNumber);
                              }}
                              className="text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* Pagination */}
                <div className="flex justify-between items-center mt-4 text-sm">
                  <span>Page {currentPage} of {totalPages}</span>
                  <div className="space-x-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => p - 1)}
                      className={`px-2 py-1 border rounded ${currentPage === 1 ? "text-gray-400" : "text-blue-600"}`}
                    >
                      Previous
                    </button>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => p + 1)}
                      className={`px-2 py-1 border rounded ${currentPage === totalPages ? "text-gray-400" : "text-blue-600"}`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No applications found.</p>
            )}
          </div>

          {/* Details & Linked Bank Account */}
          {selectedApp && (
            <>
              <div className="mb-4 border-b border-gray-300 flex gap-6 text-sm">
                <div
                  className={`cursor-pointer pb-1 ${
                    activeStep === "Application Details" ? "border-b-2 border-blue-600 text-blue-600 font-semibold" : "text-gray-600"
                  }`}
                  onClick={() => setActiveStep("Application Details")}
                >
                  Application Details
                </div>
              </div>
              <div className="bg-white p-6 rounded shadow border">{activeStep === "Application Details" && renderDetails()}</div>

              {linkedBankAccount && (
                <div className="bg-white p-6 rounded shadow border mt-4">
                  <h2 className="text-lg font-semibold mb-4 text-blue-700">Linked Bank Account</h2>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Account Holder Name:</strong> {linkedBankAccount.accountHolderName}</p>
                    <p><strong>Bank Name:</strong> {linkedBankAccount.bankName}</p>
                    <p><strong>Account Number:</strong> {linkedBankAccount.accountNumber}</p>
                    <p><strong>IFSC Code:</strong> {linkedBankAccount.ifscCode}</p>
                    <p><strong>Account Type:</strong> {linkedBankAccount.accountType}</p>
                    <p><strong>Authorized:</strong> {linkedBankAccount.isAuthorized ? "Yes" : "No"}</p>
                    <p><strong>Created Date:</strong> {new Date(linkedBankAccount.createdDate).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    // </div>
  );
};

export default SubmittedApplication;
