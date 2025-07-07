// SubmittedApplication.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHead from "./DashboardHead";
import DashboardSidebar from "./DashboardSidebar";
import { getAllApplicationDetails, deleteApplicationByNumber } from "../api_service";

const SubmittedApplication = () => {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllApplicationDetails();
        console.log("Fetched Application :",res);
        setApplications(res?.data || []);
      } catch (err) {
        console.error("❌ Error fetching applications:", err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (applicationNumber) => {
    if (!window.confirm(`Delete application ${applicationNumber}?`)) return;
    const res = await deleteApplicationByNumber(applicationNumber);
    if (res && res.status === 200) {
      alert("✅ Deleted");
      setApplications(applications.filter(app => 
        (app.applicationDetails ?? app).applicationNumber !== applicationNumber
      ));
    } else {
      alert("❌ Failed to delete");
    }
  };

  const filteredApps = applications.filter(app => (app.applicationDetails ?? app).applicationNumber);
  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentApps = filteredApps.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="flex min-h-screen bg-gray-100">
     
      <div className="flex-1">
        
        <div className="p-10">
          <h1 className="text-2xl font-bold mb-6 text-blue-700">Submitted Applications</h1>
          <div className="bg-white p-6 rounded shadow border">
            {currentApps.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border border-collapse">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-4 py-2">Application No</th>
                      <th className="border px-4 py-2">Name</th>
                      <th className="border px-4 py-2">Email</th>
                      <th className="border px-4 py-2">Phone</th>
                      <th className="border px-4 py-2">Monthly Income</th>
                      <th className="border px-4 py-2">Loan Amount</th>
                      <th className="border px-4 py-2">City</th>
                      <th className="border px-4 py-2">State</th>
                      <th className="border px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentApps.map((app, idx) => {
                      const details = app.applicationDetails ?? app;
                      const user = app.userDetails ?? {};
                      const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || "-";
                      return (
                        console.log("👉 going to details page with number:", details.applicationNumber),
                        <tr
                          key={idx}
                          className="cursor-pointer hover:bg-gray-50"
                          
                          onClick={() => navigate(`/application-details/${details.applicationNumber}`)}
                        >
                          <td className="border px-4 py-2">{details.applicationNumber ?? "-"}</td>
                          <td className="border px-4 py-2">{fullName}</td>
                          <td className="border px-4 py-2">{user.email ?? "-"}</td>
                          <td className="border px-4 py-2">{user.phone ?? "-"}</td>
                          <td className="border px-4 py-2">{details.monthlyGrossIncome ?? "-"}</td>
                          <td className="border px-4 py-2">{details.howMuchDoYouNeed ?? "-"}</td>
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
                <div className="flex justify-between mt-4 text-sm">
                  <span>Page {currentPage} of {totalPages}</span>
                  <div>
                    <button disabled={currentPage===1} onClick={()=>setCurrentPage(p=>p-1)} className="px-2 py-1 border rounded mr-2">Prev</button>
                    <button disabled={currentPage===totalPages} onClick={()=>setCurrentPage(p=>p+1)} className="px-2 py-1 border rounded">Next</button>
                  </div>
                </div>
              </div>
            ) : <p className="text-gray-500">No applications found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmittedApplication;
