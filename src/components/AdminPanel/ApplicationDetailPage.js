import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardHead from "./DashboardHead";
import DashboardSidebar from "./DashboardSidebar";
import {
  getApplicationDetailsByNumber,
  getLinkedBankAccount,
  getDocumentVerification,
  getAcceptOffer,
  getReviewAgreement,
  getFunded,
  deleteLinkedBankAccount,
  deleteDocumentVerification,
  deleteAcceptOffer,
  deleteReviewAgreement,
  deleteFunded
} from "../api_service";

const ApplicationDetailPage = () => {
  
  const { applicationNumber } = useParams(); // in future

  const [activeTab, setActiveTab] = useState("Application Details");
  const [details, setDetails] = useState(null);
  const [linkedBank, setLinkedBank] = useState(null);
  const [document, setDocument] = useState(null);
  const [offer, setOffer] = useState(null);
  const [review, setReview] = useState(null);
  const [funded, setFunded] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {

      const safeSetData = (res) => {
  if (res?.status === 200) return res.data;
  if (res?.status === 404) return null;
  if (res?.message?.toLowerCase().includes("not data found")) return null;
  return null;
};



      const res = await getApplicationDetailsByNumber(applicationNumber);
      setDetails(safeSetData(res));

      const b = await getLinkedBankAccount(applicationNumber);
      setLinkedBank(safeSetData(b));

      const d = await getDocumentVerification(applicationNumber);
      setDocument(safeSetData(d));

      const o = await getAcceptOffer(applicationNumber);
      setOffer(safeSetData(o));

      const r = await getReviewAgreement(applicationNumber);
     setReview(safeSetData(r));

      const f = await getFunded(applicationNumber);
      setFunded(safeSetData(f));
    };
    fetchAll();
  }, [applicationNumber]);

  const handleDelete = async (fn, setFn, label) => {
    if (!window.confirm(`Delete ${label}?`)) return;
    const res = await fn(applicationNumber);
    if (res?.status === 200) {
      alert("Deleted successfully");
      setFn(null);
    } else alert("Failed to delete");
  };

  // Helper to render object nicely
  const renderObject = (obj) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(obj).map(([k, v], i) => {
        let displayValue = "";
        if (typeof v === "boolean") {
          displayValue = v ? "Yes" : "No";
        } else if (typeof v === "object" && v !== null) {
          displayValue = JSON.stringify(v, null, 2);
        } else if (String(v).includes("T") && String(v).includes(":")) {
          displayValue = new Date(v).toLocaleString();
        } else {
          displayValue = String(v ?? "-");
        }

        const formattedKey = k
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, str => str.toUpperCase());

        return (
          <div key={i} className="flex flex-col p-4 bg-white rounded-xl shadow hover:shadow-md transition">
            <span className="text-gray-500 font-semibold mb-1">{formattedKey}</span>
            <span className="text-gray-800 break-all">{displayValue}</span>
          </div>
        );
      })}
    </div>
  );

  // ✅ Get current tab's title & data
  const tabTitleMap = {
    "Application Details": "Application Details",
    "Linked Bank": "Linked Bank Account",
    "Document": "Document Verification",
    "Offer": "Accept Offer",
    "Review": "Review & Sign Agreement",
    "Funded": "Funded Details"
  };

  const currentData = {
    "Application Details": details,
    "Linked Bank": linkedBank,
    "Document": document,
    "Offer": offer,
    "Review": review,
    "Funded": funded
  }[activeTab];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHead />
        <div className="p-10">
          <h1 className="text-xl font-bold mb-4 text-blue-700">
            {tabTitleMap[activeTab]} - {applicationNumber}
          </h1>

          <div className="flex gap-6 mb-4 border-b text-sm">
            {Object.keys(tabTitleMap).map(tab => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer pb-1 ${activeTab === tab ? "border-b-2 border-blue-600 text-blue-600 font-semibold" : "text-gray-600"}`}
              >
                {tab}
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded shadow text-sm">
            {/* ✅ Show data or "No data found" */}
            {activeTab === "Application Details" && details ? (
              <>
                {renderObject(details.applicationDetails ?? {})}
                {renderObject(details.userDetails ?? {})}
              </>
            ) : activeTab === "Application Details" && !details ? (
              <p className="text-gray-500">No data found.</p>
            ) : currentData ? (
              <>
                {renderObject(Array.isArray(currentData) ? currentData[0] : currentData)}
                <button
                  onClick={() => {
                    const deleteMap = {
                      "Linked Bank": [deleteLinkedBankAccount, setLinkedBank],
                      "Document": [deleteDocumentVerification, setDocument],
                      "Offer": [deleteAcceptOffer, setOffer],
                      "Review": [deleteReviewAgreement, setReview],
                      "Funded": [deleteFunded, setFunded]
                    };
                    const [fn, setFn] = deleteMap[activeTab];
                    handleDelete(fn, setFn, tabTitleMap[activeTab]);
                  }}
                  className="text-red-600 hover:underline mt-2"
                >
                  Delete
                </button>
              </>
            ) : (
              <p className="text-gray-500">No data found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailPage;
