import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllApplicationDetails,
  fetchWorkflowByLoanType,
  getApplicationDetailsByUserId,
} from "../api_service";

const UserDashboard = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username") || "User";
  const loanAmount = "$15,000";
  const approvalId = "APL-9843";
  const dealerName = "ABC Finance Co.";

  const [users, setUsers] = useState([]);
  const [selectedUserapplicationNumber, setSelectedUserapplicationNumber] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [submittedSteps, setSubmittedSteps] = useState([]);
  const [stepDetailData, setStepDetailData] = useState(null);
  const [selectedStepName, setSelectedStepName] = useState("");
  const [selectedApplicationData, setSelectedApplicationData] = useState(null);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const userId = sessionStorage.getItem("username") || "USR002";

      const response = await getApplicationDetailsByUserId(userId);
      console.log("Detail", response);

      if (response?.status === 200 && Array.isArray(response.data)) {
        const formattedUsers = response.data.map((item) => ({
         applicationId:item.applicationDetails?.applicationId,

          applicationNumber: item.loanTypeWorkflow?.applicationNumber,
          loantype: item.loanTypeWorkflow?.loanType,
          email: item.userDetails?.email || "-",
          //firstName: item.userDetails?.firstName || "-",
          //lastName: item.userDetails?.lastName || "-",
          fullName: `${item.userDetails?.firstName || "-"} ${item.userDetails?.lastName || "-"}`,

          phone: item.userDetails?.phone || "-",
          status: item.acceptOfferDetails ? "submitted" : "pending",
        }));
        setUsers(formattedUsers);
      } else {
        console.warn("No applications found or error in response.");
        setUsers([]);
      }
    };

    fetchApplications();
  }, []);

  const handleRowClick = async (user) => {
    setSelectedUserapplicationNumber(user.applicationNumber);
    setSelectedUser(user);
    setStepDetailData(null);

    // Save loanType & applicationNumber in sessionStorage
    sessionStorage.setItem("loanType", user.loantype || "");
    sessionStorage.setItem("applicationNumber", user.applicationNumber || "");

    try {
      let dynamicSteps = ["Application Form"];
      const workflowRes = await fetchWorkflowByLoanType(user.loantype?.replace(" ", "_").toLowerCase());
      const workflowSteps = workflowRes?.data?.steps || [];
      dynamicSteps = [...dynamicSteps, ...workflowSteps];
      setSteps(dynamicSteps);

      const result = await getAllApplicationDetails();
      console.log("Result",result);

      if (result?.data && Array.isArray(result.data)) {
        const selectedApp = result.data.find(
          (app) => app.loanTypeWorkflow?.applicationNumber === user.applicationNumber
        );

        if (!selectedApp) {
          setSubmittedSteps([]);
          return;
        }

        setSelectedApplicationData(selectedApp);

        const stepsCompleted = [];
        if (selectedApp.applicationDetails) stepsCompleted.push("Application Form");
        if (selectedApp.linkedBankAccounts?.length > 0) stepsCompleted.push("Link Bank Account");
        if (selectedApp.documentVerifications?.length > 0) stepsCompleted.push("Document Verification");
        if (selectedApp.acceptOfferDetails) stepsCompleted.push("Accept Offer");
        if (selectedApp.reviewAndAgreementDetails) stepsCompleted.push("Review and Sign Agreement");
        if (selectedApp.fundedInfo) stepsCompleted.push("Funded");

        setSubmittedSteps(stepsCompleted);
      }
    } catch (err) {
      console.error("Error fetching workflow or application details", err);
      setSteps([]);
      setSubmittedSteps([]);
    }
  };

  const handleDetailsClick = (step) => {
    sessionStorage.setItem("selectedStep", step);
    sessionStorage.setItem("selectedAppId", selectedUserapplicationNumber);
    setSelectedStepName(step);

    const isCompleted = submittedSteps.includes(step);

    if (step === "Application Form") {
      if (!isCompleted) {
        sessionStorage.setItem("loanType", selectedUser?.loantype || "");
        sessionStorage.setItem("applicationNumber", selectedUser?.applicationNumber || "");
        navigate("/application_form");
        return;
      } else {
        if (!selectedApplicationData) return;
        const dataToShow = selectedApplicationData.applicationDetails || {};
        setStepDetailData(dataToShow);
        return;
      }
    }

    if (!isCompleted) {
      navigate(`/form_steps`);
      return;
    }

    if (!selectedApplicationData) return;

    let dataToShow = {};
    switch (step) {
      case "Application Form":
        dataToShow = selectedApplicationData.applicationDetails || {};
        break;
      case "Link Bank Account":
        dataToShow = selectedApplicationData.linkedBankAccounts?.[0] || {};
        break;
       case "Document Verification":
        dataToShow = selectedApplicationData.documentVerifications?.[0] || {};
        break;
      case "Accept Offer":
        dataToShow = selectedApplicationData.acceptOfferDetails || {};
        break;
      case "Review and Sign Agreement":
        dataToShow = selectedApplicationData.reviewAndAgreementDetails || {};
        break;
      case "Funded":
        dataToShow = selectedApplicationData.fundedInfo || {};
        break;
      default:
        dataToShow = { message: "No data available." };
    }

    setStepDetailData(dataToShow);
  };


  const renderObject = (obj, stepName = "") => {
  if (!obj) return null;

  // Step-wise hidden fields
  const hiddenFieldsByStep = {
    "Application Form": [
       "createdDate", "updatedBy", "updatedDate", "confirmSsn", "roleId", "roleName",
      "applicationId", "isAuthorized", "consentGiven", "createdAt", "delFlag", "__v", "id","isHomeOwner","createdBy",
    ],
    "Link Bank Account": ["createdDate", "updatedBy", "delFlag", "__v","isAuthorized"],
    "Document Verification":["createdAt","consentGiven","filePath"],
    "Accept Offer": [ "createdAt", "updatedDate","consentGiven"],
    "Review and Sign Agreement": ["createdAt","identityAuthorized","infoConfirmed","termsAgreed","delFlag"],
    "Funded": [ "processedBy", "timestamp","createdBy","updatedBy","createdDate","updatedDate","delFlag"],
    "default": ["createdAt", "updatedBy", "delFlag", "__v", "id"],
  };

  const hiddenKeys = hiddenFieldsByStep[stepName] || hiddenFieldsByStep["default"];

  const entries = Object.entries(obj).filter(([key]) => !hiddenKeys.includes(key));

  const rows = [];
  for (let i = 0; i < entries.length; i += 2) {
    const [k1, v1] = entries[i];
    const [k2, v2] = entries[i + 1] || [];

    const format = (key, value) => {
      const formattedKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
      let displayValue = "";

      if (typeof value === "boolean") displayValue = value ? "Yes" : "No";
      else if (typeof value === "object" && value !== null) displayValue = JSON.stringify(value, null, 2);
      else if (String(value).includes("T") && String(value).includes(":")) displayValue = new Date(value).toLocaleString();
      else displayValue = String(value ?? "-");

      return (
        <div className="flex-1   min-w-[200px]">
          <span className="block font-semibold text-gray-600 mb-1">{formattedKey}</span> 
          <span className="text-gray-800 break-words">{displayValue}</span>
        </div>
      );
    };

    rows.push(
     <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition">
          {format(k1, v1)}
        </div>

        {k2 && (
          <div className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition">
            {format(k2, v2)}
          </div>
        )}
      </div>

    );
  }

  return <div>{rows}</div>;
};


  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex-1 pr-8 py-8">
        {/* <h1 className="text-2xl font-bold text-gray-800 mb-6 ml-4">Loan and Application</h1> */}

        <div className="bg-white rounded-xl shadow border border-[#e0f3f4] p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome, <span className="font-bold text-accent">{username}</span></h2>

          <div className="mb-4">
            <div className="font-semibold text-sm text-gray-700">Loan Applied</div>
            <div className="text-lg text-green-700">{loanAmount}</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
            <div>
              <div className="font-semibold">Approval</div>
              <div className="text-base">{approvalId}</div>
            </div>
            <div>
              <div className="font-semibold">Dealer</div>
              <div className="text-base">{dealerName}</div>
            </div>
          </div>

          <h3 className="font-semibold mb-2 text-gray-700">Applications</h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border border-primary text-sm text-left">
              <thead className="bg-gray-100 text-gray-900">
                <tr>
                 
                  <th className="px-4 py-2 border">Application Number</th>
                  <th className="px-4 py-2 border">Loan Type</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Name</th>
                 
                  <th className="px-4 py-2 border">Phone</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
    key={user.applicationNumber}
    onClick={() => handleRowClick(user)}
    className={`cursor-pointer transition ${
      selectedUserapplicationNumber === user.applicationNumber
        ? "bg-primary/30 hover:bg-primary/40"
        : "bg-white hover:bg-primary/10"
    } even:bg-gray-50`}
  >

                    
                    <td className="px-4 py-2 border">{user.applicationNumber}</td>
                    <td className="px-4 py-2 border">{user.loantype}</td>
                    <td className="px-4 py-2 border">{user.email}</td>
                    <td className="px-4 py-2 border">{user.fullName}</td>
                     <td className="px-4 py-2 border">{user.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedUserapplicationNumber && (
            <div className="mt-8">
              <div className="font-semibold mb-2 text-gray-700">Application Progress</div>
              <table className="min-w-full border border-gray-300 text-sm text-left">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 border">Step</th>
                    <th className="px-4 py-2 border">Status</th>
                    <th className="px-4 py-2 border">Result</th>
                    <th className="px-4 py-2 border">Verified By</th>
                    <th className="px-4 py-2 border">Verified On</th>
                    <th className="px-4 py-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {steps.map((step, index) => {
                    const isCompleted = submittedSteps.includes(step);
                    return (
                      <tr key={index} className="bg-white even:bg-gray-50">
                        <td className="px-4 py-2 border">{step}</td>
                        <td className="px-4 py-2 border text-center">{isCompleted ? "✅" : "⏳"}</td>
                        <td className="px-4 py-2 border">—</td>
                        <td className="px-4 py-2 border">System</td>
                        <td className="px-4 py-2 border">—</td>
                        <td className="px-4 py-2 border">
                          <button
                            onClick={() => handleDetailsClick(step)}
                            className="px-3 py-1 text-sm bg-accent hover:bg-primary/80 text-white rounded"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {stepDetailData && (
            <div className="mt-6 p-8 bg-primary/20 border rounded-xl shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {selectedStepName} - Step Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 text-sm">
                {renderObject(stepDetailData, selectedStepName)}
              </div>
              <div className="mt-4">
                <button
                  onClick={() => {
                    sessionStorage.setItem("loanType", selectedUser?.loantype || "");
                    sessionStorage.setItem("applicationNumber", selectedUser?.applicationNumber || "");

                    if (selectedStepName === "Application Form") {
                      navigate("/application-form");
                    } else {
                      navigate("/form_steps");
                    }
                  }}

                  className="px-6 py-2 text-white text-base rounded bg-accent hover:bg-primary/80 transition"
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;