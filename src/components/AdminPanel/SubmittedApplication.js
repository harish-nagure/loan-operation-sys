import React, { useEffect, useState } from "react";
import {
  getAllApplicationDetails,
  deleteApplicationByNumber,
  saveColumnPreferencesAPI,
  fetchColumnPreferencesAPI,
} from "../api_service";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaTrashAlt } from "react-icons/fa";


const allColumns = [
  { key: "applicationId", label: "Application ID" },
  { key: "city", label: "City" },
  { key: "confirmSsn", label: "Confirm SSN" },
  { key: "createdBy", label: "Created By" },
  { key: "createdDate", label: "Created Date" },
  { key: "dateOfBirth", label: "Date of Birth" },
  { key: "homeAddress", label: "Home Address" },
  { key: "homeAddress2", label: "Home Address 2" },
  { key: "howMuchDoYouNeed", label: "Loan Amount" },
  { key: "isHomeOwner", label: "Is Home Owner" },
  { key: "loanType", label: "Loan Type" },
  { key: "monthlyGrossIncome", label: "Monthly Gross Income" },
  { key: "ssn", label: "SSN" },
  { key: "state", label: "State" },
  { key: "updatedBy", label: "Updated By" },
  { key: "updatedDate", label: "Updated Date" },
  { key: "zipCode", label: "Zip Code" },
  { key: "email", label: "Email" },
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "phone", label: "Phone" },
  { key: "action", label: "Action" },
];

const SubmittedApplication = () => {
  const [step, setStep] = useState(1);
  const [userRole, setUserRole] = useState("");
  const [selected, setSelected] = useState({});
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const toggleColumn = (key) => {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const fetchApplications = async () => {
    try {
      const res = await getAllApplicationDetails();
      setApplications(res?.data || []);
    } catch (err) {
      console.error("Failed to fetch applications", err);
    }
  };

  const storePreferences = async () => {
    const payload = allColumns.map(({ key, label }) => ({
      columnName: label,
      visible: !!selected[key], 
    }));

    console.log("Saving Payload:", payload);

    try {
      await saveColumnPreferencesAPI(payload);
      console.log("Data submitted");
    } catch (e) {
      console.error("Error saving preferences", e);
    }
  };

  const loadPreferences = async () => {
    try {
      const res = await fetchColumnPreferencesAPI();
      console.log("✅ Column Preferences API Response:", res);

      if (res.status === 200 && Array.isArray(res.data)) {
        const mapped = {};
        allColumns.forEach((col) => {
          const match = res.data.find((item) => item.columnName === col.label);
          mapped[col.key] = match ? match.visible : false;
        });
        console.log("🟢 Selected columns mapped:", mapped);
        setSelected(mapped);
      }
    } catch (error) {
      console.error("❌ Error loading column preferences:", error);
    }
  };

  const handleContinue = async () => {
    await storePreferences();
    await fetchApplications();
    setStep(2);
  };

  const handleDelete = async (appNumber) => {
    if (!window.confirm(`Delete application ${appNumber}?`)) return;
    try {
      const res = await deleteApplicationByNumber(appNumber);
      if (res.status === 200) fetchApplications();
      else alert("Failed to delete");
    } catch {
      alert("Error deleting");
    }
  };

  const hasVisibleColumns = Object.values(selected).some((val) => val === true);

  useEffect(() => {
    const role = (sessionStorage.getItem("role") || "").toLowerCase();
    setUserRole(role);

    const init = async () => {
      // Initialize all columns as false
      const defaultSelected = {};
      allColumns.forEach((col) => {
        defaultSelected[col.key] = false;
      });
      setSelected(defaultSelected);

      await loadPreferences();

      if (role === "approver") {
        await fetchApplications();
        setStep(2);
      }

      setLoading(false);
    };

    init();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 pt-6 pr-8">
      <div className="max-w-6xl mx-auto bg-white shadow px-4 py-6 rounded-xl">
        {step === 1 && userRole === "admin" ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-accent">Select Columns to Display</h2>
            <table className="min-w-full text-sm border rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 font-medium">Label</th>
                  <th className="p-3 font-medium text-center">Show</th>
                </tr>
              </thead>
              <tbody>
                {allColumns.map((col) => (
                  <tr key={col.key}>
                    <td className="p-3">{col.label}</td>
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={!!selected[col.key]}
                        onChange={() => toggleColumn(col.key)}
                        className="accent-blue-600 w-4 h-4"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={handleContinue}
              className="mt-4 px-6 py-2 rounded bg-accent text-white hover:bg-secondary"
            >
              Continue
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-accent">Submitted Applications</h2>
            {!hasVisibleColumns ? (
              <p className="text-gray-500">No visible columns selected by admin.</p>
            ) : (
              <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      {Object.entries(selected).map(
                        ([k, v]) =>
                          v && (
                            <th key={k} className="p-3 font-medium">
                              {allColumns.find((col) => col.key === k)?.label}
                            </th>
                          )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app, i) => {
                      const d = app.applicationDetails || {};
                      const u = app.userDetails || {};
                      const l = app.loanTypeWorkflow || {};
                      const appNum = l?.applicationNumber;

                      return (
                        <tr key={i} className="hover:bg-blue-50">
                          {Object.entries(selected).map(([k, v]) => {
                            if (!v) return null;

                            if (k === "action") {
                              return (
                               <td key="action" className="p-3 flex items-center space-x-3">
                                <button
                                  className="text-green-600 hover:text-green-800"
                                  title="Approve"
                                >
                                  <FaCheckCircle size={18} />
                                </button>
                                <button
                                  className="text-red-600 hover:text-red-800"
                                  title="Reject"
                                >
                                  <FaTimesCircle size={18} />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(appNum);
                                  }}
                                  className="text-gray-500 hover:text-red-600"
                                  title="Delete"
                                >
                                  <FaTrashAlt size={18} />
                                </button>
                              </td>

                              );
                            }

                            const val = d[k] ?? u[k] ?? l[k] ?? "-";
                            return (
                              <td
                                key={k}
                                className="p-3 cursor-pointer"
                                onClick={() => navigate(`/application-details/${appNum}`)}
                              >
                                {String(val)}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SubmittedApplication;
