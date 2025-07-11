import React, { useEffect, useState } from "react";
import { getAllApplicationDetails, deleteApplicationByNumber } from "../api_service";
// import { TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const allColumns = [
  { key: "applicationId", label: "Application ID" },
  { key: "applicationNumber", label: "Application Number" },
  { key: "city", label: "City" },
  { key: "confirmSsn", label: "Confirm SSN" },
  { key: "createdBy", label: "Created By" },
  { key: "createdDate", label: "Created Date" },
  { key: "dateOfBirth", label: "Date of Birth" },
  { key: "homeAddress", label: "Home Address" },
  { key: "homeAddress2", label: "Home Address 2" },
  { key: "howMuchDoYouNeed", label: "Loan Amount" },
  { key: "isHomeOwner", label: "Is Home Owner" },
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
];

const PAGE_SIZE = 10;

const SubmittedApplication = () => {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState({});
  const [applications, setApplications] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [filterText, setFilterText] = useState("");
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(true);
  const navigate = useNavigate();

  const toggleColumn = (k) => setSelected(prev => ({ ...prev, [k]: !prev[k] }));

  const fetchData = async () => {
    const res = await getAllApplicationDetails().catch(console.error);
    setApplications(res?.data || []);
  };

  const handleContinue = () => {
    setStep(2);
    fetchData();
  };

  const handleDelete = async (appNumber) => {
    if (!window.confirm("Delete application " + appNumber + "?")) return;
    try {
      const res = await deleteApplicationByNumber(appNumber);
      if (res.status === 200) {
        alert("Deleted successfully ✅");
        fetchData();
      } else {
        alert("❌ Failed to delete");
      }
    } catch (err) {
      alert("❌ Error deleting");
    }
  };

  // apply filter
  let filtered = applications.filter(app => {
    if (!filterType) return true;
    const d = app.applicationDetails || {}, u = app.userDetails || {};

    if (filterType === "createdDate" && (filterFrom || filterTo)) {
      const cd = new Date(d.createdDate).setHours(0,0,0,0);
      const from = filterFrom ? new Date(filterFrom).getTime() : -Infinity;
      const to = filterTo ? new Date(filterTo).getTime() : Infinity;
      return cd >= from && cd <= to;
    }

    if (filterText) {
      if (filterType === "applicationNumber")
        return d.applicationNumber?.toString().includes(filterText);
      if (filterType === "name") {
        const full = `${u.firstName || ""} ${u.lastName || ""}`.toLowerCase();
        return full.includes(filterText.toLowerCase());
      }
      if (filterType === "howMuchDoYouNeed")
        return parseFloat(d.howMuchDoYouNeed) === parseFloat(filterText);
    }

    return true;
  });

  // sort ascending by createdDate
  filtered.sort((a, b) => new Date(a.applicationDetails?.createdDate) - new Date(b.applicationDetails?.createdDate));

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const current = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gray-100 pt-6 pr-8">
      <div className="max-w-6xl mx-auto bg-white shadow px-4 py-6 rounded-xl">
        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-accent hover:text-secondary">Select Columns to Display</h2>
            <table className="min-w-full text-sm text-left border rounded-lg overflow-hidden">
  <thead className="bg-gray-100 text-gray-800">
    <tr>
      <th className="p-3 font-medium">Label</th>
      <th className="p-3 font-medium text-center">Show</th>
    </tr>
  </thead>
  <tbody>
    {allColumns.map(col => (
      <tr key={col.key} className="hover:bg-blue-50 transition-colors">
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
              className="mt-4 px-6 py-2 rounded bg-accent text-white hover:bg-secondary transition"
            >Continue</button>
          </>
        ) : (
          <>
<div className="flex items-center justify-between mb-4">
  <h2 className="text-2xl font-bold text-accent hover:text-secondary">Submitted Applications</h2>
  <button
  onClick={() => setShowFilter(!showFilter)}
  className="text-sm font-medium px-4 py-2 rounded-md bg-accent text-white hover:bg-secondary transition duration-200"
>
  {showFilter ? "Hide Filter" : "Show Filter"}
</button>

</div>
    

            {/* Filters */}
            {showFilter && (
              <div className="mb-4 flex flex-col md:flex-row gap-4 items-start">
                <select
                  className="border px-3 py-2 rounded"
                  value={filterType}
                  onChange={e => {
                    setFilterType(e.target.value);
                    setFilterText("");
                    setFilterFrom("");
                    setFilterTo("");
                    setCurrentPage(1);
                  }}
                >
                  <option value="">-- Select Filter --</option>
                  <option value="applicationNumber">Application Number</option>
                  <option value="name">Name</option>
                  <option value="howMuchDoYouNeed">Loan Amount</option>
                  <option value="createdDate">Created Date</option>
                </select>

                {filterType === "createdDate" ? (
                  <>
                    <input
                      type="date"
                      className="border px-3 py-2 rounded"
                      value={filterFrom}
                      onChange={e => setFilterFrom(e.target.value)}
                    />
                    <span className="self-center">to</span>
                    <input
                      type="date"
                      className="border px-3 py-2 rounded"
                      value={filterTo}
                      onChange={e => setFilterTo(e.target.value)}
                    />
                  </>
                ) : filterType ? (
                  <input
                    type={filterType === "howMuchDoYouNeed" ? "number" : "text"}
                    placeholder={`Enter ${filterType}`}
                    className="border px-3 py-2 rounded"
                    value={filterText}
                    onChange={e => setFilterText(e.target.value)}
                  />
                ) : null}
              </div>
            )}

            {/* Table */}
           {/* Table */}
<div className="overflow-x-auto border rounded-lg">
  <table className="min-w-full text-sm text-left">
    <thead className="bg-gray-100 text-gray-800">
      <tr>
        {Object.entries(selected).map(([k, v]) =>
          v ? (
            <th key={k} className="p-3 font-medium">
              {allColumns.find(col => col.key === k)?.label}
            </th>
          ) : null
        )}
        <th className="p-3 font-medium">Action</th>
      </tr>
    </thead>
    <tbody>
      {current.map((app, i) => {
        const d = app.applicationDetails || {}, u = app.userDetails || {};
        const appNum = d.applicationNumber;

        return (
          <tr
            key={i}
            className="hover:bg-blue-50 transition-colors duration-200"
          >
            {Object.entries(selected).map(([k, v]) => {
              if (!v) return null;
              const val = d[k] ?? u[k] ?? "-";
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
            <td className="p-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(appNum);
                }}
                className="text-red-600 hover:text-red-800"
              >
                {/* <TrashIcon className="w-5 h-5" /> */}
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

{/* Pagination */}
<div className="flex justify-between items-center mt-4 text-sm">
  <button
    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((p) => p - 1)}
  >
    Previous
  </button>
  <span>
    Page {currentPage} of {totalPages}
  </span>
  <button
    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((p) => p + 1)}
  >
    Next
  </button>
</div>


            {/* Pagination */}
           
          </>
        )}
      </div>
    </div>
  );
};

export default SubmittedApplication;
