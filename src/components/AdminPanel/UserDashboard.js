import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllApplicationDetails, fetchWorkflowByLoanType } from "../api_service";

const UserDashboard = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username") || "User";
  const loanAmount = "$15,000";
  const approvalId = "APL-9843";
  const dealerName = "ABC Finance Co.";

  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // ✅ NEW
  const [submittedSteps, setSubmittedSteps] = useState([]);
  const [stepDetailData, setStepDetailData] = useState(null);
  const [selectedStepName, setSelectedStepName] = useState("");
  const [selectedApplicationData, setSelectedApplicationData] = useState(null);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const dummyUsers = [
      {
        applicationId: 107,
        applicationNumber: "USR002-107",
        loantype: "vehicle",
        email: "-",
        firstName: "-",
        lastName: "-",
        isHomeOwner: false,
        status: "pending",
      },
      {
        applicationId: 111,
        applicationNumber: "USR002-111",
        loantype: "personal",
        email: "harish.nagure@whitestones.co.in",
        firstName: "Harish",
        lastName: "Nagure",
        isHomeOwner: false,
        status: "submitted",
      },
      {
        applicationId: 139,
        applicationNumber: "USR002-139",
        loantype: "personal",
        email: "john.wick@gmail.com",
        firstName: "John",
        lastName: "Wick",
        isHomeOwner: true,
        status: "submitted",
      },
    ];
    setUsers(dummyUsers);
  }, []);

  const handleRowClick = async (user) => {
    setSelectedUserId(user.applicationId);
    setSelectedUser(user); // ✅ Store full selected user
    setStepDetailData(null);

    sessionStorage.setItem("loanType", user.loantype); // ✅ Store loanType now

    try {
      let dynamicSteps = ["Application Form"];
      const workflowRes = await fetchWorkflowByLoanType(user.loantype?.toLowerCase());
      const workflowSteps = workflowRes?.data?.steps || [];
      dynamicSteps = [...dynamicSteps, ...workflowSteps];
      setSteps(dynamicSteps);

      const result = await getAllApplicationDetails();

      if (result?.data && Array.isArray(result.data)) {
        const selectedApp = result.data.find(
          (app) => app.applicationDetails?.applicationNumber === user.applicationNumber
        );

        if (!selectedApp) {
          setSubmittedSteps([]);
          return;
        }

        setSelectedApplicationData(selectedApp);

        const stepsCompleted = [];
        if (selectedApp.applicationDetails) stepsCompleted.push("Application Form");
        if (selectedApp.linkedBankAccounts?.length > 0) stepsCompleted.push("Link Bank Account");
        if (selectedApp.documentVerification) stepsCompleted.push("Document Verification");
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
    sessionStorage.setItem("selectedAppId", selectedUserId);
    setSelectedStepName(step);

    const isCompleted = submittedSteps.includes(step);

      if (step === "Application Form") {
    if (!isCompleted) {
      // Not completed → navigate to application form page
      sessionStorage.setItem("mode", "edit");
      sessionStorage.setItem("loanType", selectedUser?.loantype || "");
      sessionStorage.setItem(
        "applicationNumber",
        selectedUser?.applicationNumber || ""
      );
      navigate("/application_form");
      return;
    } else {
      // Completed → show detail below
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

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex-1 pr-8 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 ml-4">Loan and Application</h1>

        <div className="bg-white rounded-xl shadow border border-[#e0f3f4] p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome, {username}</h2>

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
            <table className="min-w-full border border-gray-200 text-sm text-left">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">Application ID</th>
                  <th className="px-4 py-2 border">Application Number</th>
                  <th className="px-4 py-2 border">Loan Type</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">First Name</th>
                  <th className="px-4 py-2 border">Last Name</th>
                  <th className="px-4 py-2 border">Is Home Owner</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.applicationId}
                    onClick={() => handleRowClick(user)}
                    className={`cursor-pointer ${selectedUserId === user.applicationId ? "bg-blue-50" : "bg-white"} even:bg-gray-50`}
                  >
                    <td className="px-4 py-2 border">{user.applicationId}</td>
                    <td className="px-4 py-2 border">{user.applicationNumber}</td>
                    <td className="px-4 py-2 border">{user.loantype}</td>
                    <td className="px-4 py-2 border">{user.email}</td>
                    <td className="px-4 py-2 border">{user.firstName}</td>
                    <td className="px-4 py-2 border">{user.lastName}</td>
                    <td className="px-4 py-2 border">{user.isHomeOwner ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedUserId && (
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
                        <td className="px-4 py-2 border text-center">
                          {isCompleted ? "✅" : "⏳"}
                        </td>
                        <td className="px-4 py-2 border">—</td>
                        <td className="px-4 py-2 border">System</td>
                        <td className="px-4 py-2 border">—</td>
                        <td className="px-4 py-2 border">
                          <button
                            onClick={() => handleDetailsClick(step)}
                            className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
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
            <div className="mt-6 p-4 bg-white border rounded-xl shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {selectedStepName} - Step Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {Object.entries(stepDetailData).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-gray-600 font-medium">{key}</div>
                    <div className="text-gray-900">{String(value)}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
             <button
  onClick={() => {
    sessionStorage.setItem("mode", "edit");
    sessionStorage.setItem("loanType", selectedUser?.loantype || "");
    sessionStorage.setItem(
      "applicationNumber",
      selectedApplicationData?.applicationDetails?.applicationNumber || ""
    );

    if (selectedStepName === "Application Form") {
      navigate("/application-form");
    } else {
      navigate("/form_steps");
    }
  }}
  className="px-4 py-2 text-white rounded bg-blue-500 hover:bg-blue-600"
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
