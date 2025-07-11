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
  deleteFunded,
} from "../api_service";

const ApplicationDetailPage = () => {
  const { applicationNumber } = useParams();

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

  // Helper to nicely render object as "Label: Value" side-by-side
  const renderObject = (obj) => (
    <div className="space-y-3">
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
          .replace(/^./, (str) => str.toUpperCase());

        return (
          <div
            key={i}
            className="flex flex-wrap md:flex-nowrap items-center gap-2 bg-white p-4 rounded-xl shadow hover:shadow-md transition"
          >
            <span className="w-full md:w-48 font-semibold text-gray-600 whitespace-nowrap">
              {formattedKey}:
            </span>
            <span className="text-gray-800 break-words">{displayValue}</span>
          </div>
        );
      })}
    </div>
  );

  const tabTitleMap = {
    "Application Details": "Application Details",
    "Linked Bank": "Linked Bank Account",
    Document: "Document Verification",
    Offer: "Accept Offer",
    Review: "Review & Sign Agreement",
    Funded: "Funded Details",
  };

  const currentData = {
    "Application Details": details,
    LinkedBank: linkedBank,
    LinkedBank: linkedBank,
    Document: document,
    Offer: offer,
    Review: review,
    Funded: funded,
  }[activeTab];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">
          {tabTitleMap[activeTab]} - {applicationNumber}
        </h1>

        <div className="flex gap-6 mb-8 border-b border-gray-300 text-sm">
          {Object.keys(tabTitleMap).map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer pb-2 ${
                activeTab === tab
                  ? "border-b-4 border-blue-600 text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {tab}
            </div>
          ))}
        </div>

        <div>
          {/* Show data or "No data found" */}
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
                    Document: [deleteDocumentVerification, setDocument],
                    Offer: [deleteAcceptOffer, setOffer],
                    Review: [deleteReviewAgreement, setReview],
                    Funded: [deleteFunded, setFunded],
                  };
                  const [fn, setFn] = deleteMap[activeTab];
                  handleDelete(fn, setFn, tabTitleMap[activeTab]);
                }}
                className="text-red-600 hover:underline mt-4"
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
  );
};

export default ApplicationDetailPage;
