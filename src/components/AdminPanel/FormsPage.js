import React, { useEffect, useState,useRef } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHead from "./DashboardHead";
import { CheckCircle,Check } from "lucide-react";
import { FaFolderPlus } from "react-icons/fa6";
import {addAccountLinked, fetchWorkflowByLoanType, addDocumentVerified, addOrUpdateAcceptOffer, addOrUpdateReviewAgreement,getLinkedBankAccount,getDocumentVerification,getAcceptOffer,getReviewAgreement,getFunded,addOrUpdateFundedInfo} from "../api_service";

const   FormsPage = () => {
  const navigate = useNavigate();
  
  const [steps, setSteps] = useState([]);
  const [active, setActive] = useState("");
  const [submittedSteps, setSubmittedSteps] = useState(() => {
    const stored = sessionStorage.getItem("submittedSteps");
    return stored ? JSON.parse(stored) : [];
  });
  

useEffect(() => {
  const fetchStepsFromAPI = async () => {
    const loanType = sessionStorage.getItem("selectedLoanType"); // ✅ changed key
    const applicationNumber = sessionStorage.getItem("applicationNumber"); // ✅ new

    if (!loanType || !applicationNumber) {
      alert("Loan type or application number not found.");
      navigate("/workflow/custom");
      return;
    }

    console.log("🟢 loanType:", loanType);
    console.log("🟢 applicationNumber:", applicationNumber);

    const result = await fetchWorkflowByLoanType(loanType);

    if (result.status === 200 && Array.isArray(result.data?.steps)) {
      setSteps(result.data.steps);
      setActive(result.data.steps[0]);

      // 🔄 Optionally: fetch existing form data using applicationNumber
      // const formData = await getApplicationDetailByNumber(applicationNumber);
      // prefillForms(formData);
    } else {
      alert("No workflow steps found for this loan type.");
    }
  };

  fetchStepsFromAPI();
}, []);


  const goToNextStep = (currentStep) => {
    const index = steps.indexOf(currentStep);
    if (index !== -1 && index < steps.length - 1) {
      setActive(steps[index + 1]);
    } else {
      alert("🎉 All steps completed!");
    }
  };

  const markAsSubmitted = (step) => {
    const updated = [...new Set([...submittedSteps, step])];
    setSubmittedSteps(updated);
    sessionStorage.setItem("submittedSteps", JSON.stringify(updated));
    goToNextStep(step);
  };

  const isSubmitted = (step) => submittedSteps.includes(step);

  const renderForm = (step) => {
    const props = {
      onSubmitSuccess: () => markAsSubmitted(step),
      applicationNumber: sessionStorage.getItem("applicationNumber"), // ✅ added
    };

    switch (step) {
      case "Link Bank Account":
        return <LinkBankForm {...props} />;
      case "Document Verification":
        return <DocumentVerificationForm {...props} />;
      case "Accept Offer":
        return <AcceptOfferForm {...props} />;
      case "Review and Sign Agreement":
        return <ReviewAgreementForm {...props} />;
      case "Funded":
        return <FundedForm {...props} />;
      default:
        return null;
    }
  };

  return (

        <div className="flex-1 px-10 py-8 overflow-y-auto">
          {/* Step Tracker */}
          <div className="relative flex justify-between items-start mb-12 pl-8 pr-8">
            {/* Background Line */}
            <div className="absolute top-3 left-0 right-0 h-1 bg-gray-300 z-0" />

            {steps.map((step, index) => {
              const submitted = isSubmitted(step);
              const isActive = active === step;
              const isLast = index === steps.length - 1;

              return (
                <div key={step} className="relative z-10 flex flex-col items-center flex-1">
                  {/* Circle */}
                  <div
                    onClick={() => !submitted && setActive(step)}
                    className={`w-6 h-6 rounded-full border-4 flex items-center justify-center cursor-pointer transition
                      ${submitted
                        ? "bg-green-500 border-green-500 text-white"
                        : isActive
                        ? "border-green-500 bg-white"
                        : "border-gray-300 bg-white"
                      }`}
                  >
                    {submitted && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>

                  {/* Line to next circle */}
                  {!isLast && (
                    <div className="absolute top-3 left-full w-40 h-1 bg-gray-300 -ml-1" />
                  )}

                  {/* Step Label */}
                  <div className="mt-3 text-sm text-black text-center max-w-[100px] break-words leading-snug">
                    {step}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Render Actual Form */}
          <div className="bg-white border border-[#e0f3f4] shadow rounded-xl p-8">
            {renderForm(active)}
          </div>
        </div>
    //   </div>
    // </div>
  );
};

export default FormsPage;



const LinkBankForm = ({ onSubmitSuccess }) => {
  const [form, setForm] = useState({
    holderName: "",
    bankName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifsc: "",
    accountType: "",
    consent: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      const applicationNumber = sessionStorage.getItem("applicationNumber");
      if (!applicationNumber) return;

      const result = await getLinkedBankAccount(applicationNumber);
      console.log("Result",result);

      if (Array.isArray(result.data) && result.data.length > 0) {
  const data = result.data[0];
  setForm({
    holderName: data.accountHolderName || "",
    bankName: data.bankName || "",
    accountNumber: data.accountNumber || "",
    confirmAccountNumber: data.accountNumber || "",
    ifsc: data.ifscCode || "",
    accountType: data.accountType || "",
    consent: data.isAuthorized || false,
  });
} else {
  console.warn("Bank account data not found.");
}

    };

    fetchDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.holderName) newErrors.holderName = "Required";
    if (!form.bankName) newErrors.bankName = "Required";
    if (!form.accountNumber) newErrors.accountNumber = "Required";
    if (!form.confirmAccountNumber) newErrors.confirmAccountNumber = "Required";
    if (form.accountNumber !== form.confirmAccountNumber)
      newErrors.confirmAccountNumber = "Account numbers do not match";
    if (!form.ifsc) newErrors.ifsc = "Required";
    if (!form.accountType) newErrors.accountType = "Required";
    if (!form.consent) newErrors.consent = "Authorization required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
  
   

    const applicationNumber = sessionStorage.getItem("applicationNumber");
    if (applicationNumber == null) {
      alert("❌ Application number is missing!");
      return;
    }

    const requestData = {
    accountHolderName: form.holderName,
    bankName: form.bankName,
    accountNumber: form.accountNumber,
    ifscCode: form.ifsc,
    accountType: form.accountType,
    isAuthorized: form.consent,
    applicationDetail: {
      applicationNumber: applicationNumber
    },
  };

    console.table(requestData)

    const response = await addAccountLinked(requestData );

    console.table(response)

    alert(response?.message);

    onSubmitSuccess();
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold mb-10">Link Bank Account</h3>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Holder Name */}
          <div>
            <label className="block mb-1 text-sm font-medium">Account Holder Name</label>
            <input
              name="holderName"
              className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-1"
              value={form.holderName}
              onChange={handleChange}
            />
            {errors.holderName && <p className="text-red-500 text-sm mt-1">{errors.holderName}</p>}
          </div>

          {/* Bank Name */}
          <div>
            <label className="block mb-1 text-sm font-medium">Bank Name</label>
            <input
              name="bankName"
              className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-1"
              value={form.bankName}
              onChange={handleChange}
            />
            {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>}
          </div>

          {/* Account Number */}
          <div>
            <label className="block mb-1 text-sm font-medium">Account Number</label>
            <input
              name="accountNumber"
              className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-1"
              value={form.accountNumber}
              onChange={handleChange}
            />
            {errors.accountNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>
            )}
          </div>

          {/* Confirm Account Number */}
          <div>
            <label className="block mb-1 text-sm font-medium">Confirm Account Number</label>
            <input
              name="confirmAccountNumber"
              className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-1"
              value={form.confirmAccountNumber}
              onChange={handleChange}
            />
            {errors.confirmAccountNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmAccountNumber}</p>
            )}
          </div>

          {/* IFSC Code */}
          <div>
            <label className="block mb-1 text-sm font-medium">IFSC Code</label>
            <input
              name="ifsc"
              className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-1"
              value={form.ifsc}
              onChange={handleChange}
            />
            {errors.ifsc && <p className="text-red-500 text-sm mt-1">{errors.ifsc}</p>}
          </div>

          {/* Account Type */}
          <div>
            <label className="block mb-1 text-sm font-medium">Account Type</label>
            <select
              name="accountType"
              className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-1 bg-transparent"
              value={form.accountType}
              onChange={handleChange}
            >
              <option value="">Select Account Type</option>
              <option value="Saving">Saving</option>
              <option value="Current">Current</option>
            </select>
            {errors.accountType && <p className="text-red-500 text-sm mt-1">{errors.accountType}</p>}
          </div>
        </div>

        {/* Consent */}
        <div className="mt-8">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm">I authorize to link my bank account</span>
          </label>
          {errors.consent && <p className="text-red-500 text-sm mt-1">{errors.consent}</p>}
        </div>

        {/* Submit */}
        <div className="mt-8">
          <button
            type="submit"
            className="bg-[#029aaa] text-white px-6 py-2 rounded hover:bg-[#01c4d5] transition flex items-center gap-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};


const DocumentVerificationForm = ({ onSubmitSuccess }) => {
  const [form, setForm] = useState({
    documentType: "",
    documentNumber: "",
    issueDate: "",
    expiryDate: "",
    issuingAuthority: "",
    consent: false,
    documentFiles: [],
  });

  const [errors, setErrors] = useState({});
  const [newFile, setNewFile] = useState(null);

  useEffect(() => {
  const fetchDocumentData = async () => {
    const applicationNumber = sessionStorage.getItem("applicationNumber");
    if (!applicationNumber) return;

    try {
      const result = await getDocumentVerification(applicationNumber);
      console.log("Fetched Document Verification:", result);

      if (result?.data && result.data.length > 0) {
        const data = result.data[0];
        setForm({
          documentType: data.documentType || "",
          documentNumber: data.documentNumber || "",
          issueDate: data.issueDate || "",
          expiryDate: data.expiryDate || "",
          issuingAuthority: data.issuingAuthority || "",
          consent: data.consentGiven || false,
          documentFiles: [], // Can't pre-fill uploaded files
        });
      }
    } catch (error) {
      console.error("Error fetching document verification data:", error);
    }
  };

  fetchDocumentData();
}, []);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewFile(file);
  };

  const handleAddFile = () => {
    if (!newFile) return;
    setForm((prev) => ({
      ...prev,
      documentFiles: [...prev.documentFiles, newFile],
    }));
    setNewFile(null);
  };

//   const handleAddFile = (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   setForm((prev) => ({
//     ...prev,
//     documentFiles: [file], // overwrite existing files
//   }));
// };

  const handleDeleteFile = (index) => {
    setForm((prev) => {
      const updatedFiles = [...prev.documentFiles];
      updatedFiles.splice(index, 1);
      return { ...prev, documentFiles: updatedFiles };
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.documentType) newErrors.documentType = "Required";
    if (!form.documentNumber) newErrors.documentNumber = "Required";
    if (!form.issueDate) newErrors.issueDate = "Required";
    if (!form.expiryDate) newErrors.expiryDate = "Required";
    if (!form.issuingAuthority) newErrors.issuingAuthority = "Required";
    if (form.documentFiles.length === 0)
      newErrors.documentFile = "At least one document is required";
    if (!form.consent) newErrors.consent = "Consent required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filePath = form.documentFile;
    console.log(filePath);
    if (!validate()) return;

    const userId = sessionStorage.getItem("username");
    const applicationNumber = sessionStorage.getItem("applicationNumber");

    if (!applicationNumber) {
      alert("❌ Application number is missing!");
      return;
    }
    if (!userId) {
      alert("❌ User ID is missing!");
      return;
    }

    
    const requestData = {
      applicationNumber,
      user: { userId },
      documentNumber: form.documentNumber,
      issueDate: form.issueDate,
      expiryDate: form.expiryDate,
      issuingAuthority: form.issuingAuthority,
      // filePath: form.documentFiles,
      consentGiven: form.consent,
    };
    console.log(requestData)
    const { documentFiles, ...formData } = form;
    // sessionStorage.setItem("documentVerification", JSON.stringify(formData));
    const response = await addDocumentVerified(requestData);
    if (response.status == 500){
      alert(response?.message);
      return;
    }else{
      alert(response?.message);
      onSubmitSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      
        <h3 className="text-3xl font-bold mb-10">Document Verification</h3>
      <form
        onSubmit={handleSubmit}
      className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        {/* Left: Form Section */}
        <div>
          
          <div className="space-y-6">
            {[
              { label: "Document Type", name: "documentType", type: "select", options: ["Aadhaar", "PAN", "Passport", "Driving License"] },
              { label: "Document Number", name: "documentNumber", type: "text" },
              { label: "Issue Date", name: "issueDate", type: "date" },
              { label: "Expiry Date", name: "expiryDate", type: "date" },
              { label: "Issuing Authority", name: "issuingAuthority", type: "text" },
            ].map((field, idx) => (
              <div key={idx}>
                <label className="block mb-1 text-sm font-medium">{field.label}</label>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-1"
                  >
                    <option value="">Select</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-1"
                  />
                )}
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                )}
              </div>
            ))}

            {/* Consent */}
            <div className="mt-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm">I consent to document verification</span>
              </label>
              {errors.consent && (
                <p className="text-red-500 text-sm mt-1">{errors.consent}</p>
              )}
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="bg-[#029aaa] text-white px-6 py-2 rounded hover:bg-[#01c4d5] transition flex items-center gap-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Right: File Upload and Preview */}
        <div className="space-y-4">  
            <label className="block mb-2 text-sm font-semibold">
              Upload Document (PDF, Image)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#029aaa]"              
                disabled={form.documentFiles.length >= 1}
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={handleAddFile}
                className="bg-[#029aaa] text-white px-5 py-2 rounded-lg hover:bg-[#01c4d5] transition"
              >
                <FaFolderPlus /> Add
              </button>
            </div>
            {errors.documentFile && (
              <p className="text-red-500 text-sm mt-2">{errors.documentFile}</p>
            )}


          <ul className="bg-[#029aaa]/20 space-y-4 h-[400px] overflow-auto custom-scrollbar border rounded-xl">
            {form.documentFiles.map((file, idx) => (
              <li
                key={idx}
                className="bg-white border m-3 border-gray-200 rounded-xl p-4 shadow"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-800 truncate">{file.name}</span>
                  <div className="flex gap-4">
                    <a
                      href={URL.createObjectURL(file)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#029aaa] text-sm underline"
                    >
                      View
                    </a>
                    <button
                      type="button"
                      onClick={() => handleDeleteFile(idx)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="rounded-lg overflow-hidden border">
                  {file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="w-full max-h-[300px] object-contain"
                    />
                  ) : file.type === "application/pdf" ? (
                    <iframe
                      src={URL.createObjectURL(file)}
                      title="PDF Preview"
                      className="w-full h-[600px]"
                    />
                  ) : (
                    <div className="text-sm text-gray-500 italic">Preview not available</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

      </form>
    </div>
  );
};




const AcceptOfferForm = ({ onSubmitSuccess }) => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [tenure, setTenure] = useState(12);
  const [interestRate, setInterestRate] = useState(12);
  const [emi, setEmi] = useState(0);
  const [consent, setConsent] = useState(false);

  // 👉 Fetch backend data when component mounts
  useEffect(() => {
    const fetchOfferData = async () => {
      const applicationNumber = sessionStorage.getItem("applicationNumber");
      const userId = sessionStorage.getItem("username");

      if (!applicationNumber || !userId) return;

      try {
        const response = await getAcceptOffer(applicationNumber, userId);
        if (response?.status === 200 && response.data) {
          const data = response.data;

          setLoanAmount(data.loanAmount || 100000);
          setTenure(data.tenureMonths || 12);
          setInterestRate(data.interestRate || 12);
          setConsent(data.consentGiven || false);

          // Auto-calculate EMI
          const P = data.loanAmount;
          const R = data.interestRate / 12 / 100;
          const N = data.tenureMonths;
          if (P && R && N) {
            const calculatedEmi =
              (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
            setEmi(Math.round(calculatedEmi));
          }
        }
      } catch (err) {
        console.error("❌ Error fetching accept offer data", err);
      }
    };

    fetchOfferData();
  }, []);

  // Recalculate EMI on changes
  useEffect(() => {
    const P = loanAmount;
    const R = interestRate / 12 / 100;
    const N = tenure;

    if (P && R && N) {
      const calculatedEmi =
        (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      setEmi(Math.round(calculatedEmi));
    } else {
      setEmi(0);
    }
  }, [loanAmount, tenure, interestRate]);

  const handleAccept = async () => {
    if (!consent) {
      alert("Please accept the terms and conditions.");
      return;
    }

    const userId = sessionStorage.getItem("username");
    const applicationNumber = sessionStorage.getItem("applicationNumber");

    if (!applicationNumber || !userId) {
      alert("❌ Application number or user ID is missing!");
      return;
    }

    const acceptedData = {
      applicationDetail: { applicationNumber },
      user: { userId },
      loanAmount,
      tenureMonths: tenure,
      interestRate,
      estimatedEmi: emi,
      consentGiven: consent,
    };

    try {
      const response = await addOrUpdateAcceptOffer(acceptedData);
      if (response.status === 500) {
        alert(response?.message || "Something went wrong");
        return;
      } else {
        alert(response?.message || "Offer accepted successfully");
        onSubmitSuccess();
      }
    } catch (error) {
      alert("❌ Failed to submit offer");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAccept();
      }}
      className="min-h-screen w-full px-6 py-10 bg-white"
    >
      <h3 className="text-2xl font-bold mb-10">Accept Offer</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Loan Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loan Amount (₹)
          </label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full border-b border-gray-400 py-1 outline-none bg-transparent"
          />
        </div>

        {/* Tenure */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tenure (Months)
          </label>
          <select
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full border-b border-gray-400 py-1 outline-none bg-transparent"
          >
            {[12, 24, 36, 48, 60].map((month) => (
              <option key={month} value={month}>
                {month} Months
              </option>
            ))}
          </select>
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Interest Rate (%)
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full border-b border-gray-400 py-1 outline-none bg-transparent"
          />
        </div>

        {/* EMI */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estimated EMI (₹)
          </label>
          <input
            type="text"
            value={emi}
            readOnly
            className="w-full border-b border-gray-200 bg-transparent text-gray-600 py-1"
          />
        </div>
      </div>

      {/* Terms Checkbox */}
      <div className="max-w-5xl mx-auto mt-8">
        <label className="inline-flex items-start space-x-2">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1"
          />
          <span className="text-sm text-gray-700">
            I agree to the{" "}
            <a
              href="/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Terms and Conditions
            </a>
            .
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="mt-10 flex justify-center">
        <button
          type="submit"
          className="bg-[#029aaa] text-white px-6 py-2 rounded hover:bg-[#01c4d5] transition flex items-center gap-2"
        >
          Accept Offer
        </button>
      </div>
    </form>
  );
};





const ReviewAgreementForm = ({ formData, onSubmitFinal, onSubmitSuccess }) => {
  const [consents, setConsents] = useState({
    confirmAccuracy: false,
    agreeToTerms: false,
    authorizeVerification: false,
  });

  const [signatureMode, setSignatureMode] = useState("upload");
  const [signatureFile, setSignatureFile] = useState(null);
  const [signatureURL, setSignatureURL] = useState(null);
  const [fullName, setFullName] = useState("");
  const [signatureType, setSignatureType] = useState(""); // NEW FIELD
  const [errors, setErrors] = useState({});
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
  const fetchAgreement = async () => {
    const applicationNumber = sessionStorage.getItem("applicationNumber");
    const userId = sessionStorage.getItem("username");

    if (!applicationNumber || !userId) return;

    try {
      const response = await getReviewAgreement(applicationNumber, userId);

      if (response?.status === 200 && response.data) {
        const data = response.data;

        setConsents({
          confirmAccuracy: data.infoConfirmed || false,
          agreeToTerms: data.termsAgreed || false,
          authorizeVerification: data.identityAuthorized || false,
        });

        setFullName(data.fullName || "");
        setSignatureType(data.signatureType || "");

        if (data.signatureMethod === "upload") {
          setSignatureMode("upload");
          setSignatureURL(data.signaturePath || null);
        } else if (data.signatureMethod === "draw") {
          setSignatureMode("draw");

          // Optionally load signaturePath into canvas if possible
          // Example: Not needed unless you're rendering the drawn image
        }
      }
    } catch (err) {
      console.error("Failed to fetch agreement data", err);
    }
  };

  fetchAgreement();
}, []);


  const handleConsentChange = (e) => {
    const { name, checked } = e.target;
    setConsents((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSignatureFile(file);
      setSignatureURL(URL.createObjectURL(file));
    }
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const validate = () => {
    const newErrors = {};
    if (!consents.confirmAccuracy) newErrors.confirmAccuracy = "Required";
    if (!consents.agreeToTerms) newErrors.agreeToTerms = "Required";
    if (!consents.authorizeVerification) newErrors.authorizeVerification = "Required";
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!signatureType.trim()) newErrors.signatureType = "Signature type is required";

    if (signatureMode === "upload" && !signatureFile)
      newErrors.signature = "Upload your signature file.";
    if (signatureMode === "draw") {
      const canvas = canvasRef.current;
      const blank = document.createElement("canvas");
      blank.width = canvas.width;
      blank.height = canvas.height;
      if (canvas.toDataURL() === blank.toDataURL())
        newErrors.signature = "Draw your signature.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const userId = sessionStorage.getItem("username");
    const applicationNumber = sessionStorage.getItem("applicationNumber");

    if (!applicationNumber) {
      alert("❌ Application number is missing!");
      return;
    }
    if (!userId) {
      alert("❌ User ID is missing!");
      return;
    }

// "applicationNumber": "APP123456",

// "userId": "USR001",

// "infoConfirmed": true,

// "termsAgreed": true,

// "identityAuthorized": true,

// "fullName": "John Doe",

// "signatureType": "Digital",

// "signatureMethod": "Draw",

// "signaturePath": "/uploads/signatures/signature_123.png"

    const acceptedData = {
      applicationNumber,
      userId ,
      
      infoConfirmed:consents.confirmAccuracy,
      termsAgreed:consents.agreeToTerms,
      identityAuthorized:consents.authorizeVerification,

      fullName,
      signatureType,
      signatureMethod:signatureMode,

      signaturePath: 
        signatureMode === "upload"
          ? signatureURL
          : canvasRef.current.toDataURL("image/png"),
      
      // acceptedAt: new Date().toISOString(),
    };

   
    console.table(acceptedData)
    const response = await addOrUpdateReviewAgreement(acceptedData);
    if (response.status == 500){
      alert(response?.message);
      return;
    }else if(response?.status == 200){
      alert(response?.message);
      onSubmitSuccess();
    }
    // sessionStorage.setItem("signedAgreement", JSON.stringify(payload));
    // alert("Agreement submitted successfully.");
    // onSubmitFinal();  
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
      >
      <h3 className="text-2xl font-bold">Review & Agreement </h3>

        {/* Consent Checkboxes */}
        <div className="col-span-2 space-y-4">
          {[
            {
              name: "confirmAccuracy",
              label: "I confirm all provided information is accurate.",
            },
            {
              name: "agreeToTerms",
              label: (
                <span>
                  I agree to the{" "}
                  <a
                    href="/terms-and-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    Terms and Conditions
                  </a>
                  .
                </span>
              ),
            },
            {
              name: "authorizeVerification",
              label: "I authorize document and identity verification.",
            },
          ].map(({ name, label }) => (
            <label key={name} className="flex items-start gap-2 text-sm text-black-700">
              <input
                type="checkbox"
                name={name}
                checked={consents[name]}
                onChange={handleConsentChange}
                className="mt-1 accent-blue-600"
              />
              <span>{label}</span>
              {errors[name] && <p className="text-red-500 text-xs">{errors[name]}</p>}
            </label>
          ))}
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border-b border-gray-300 focus:border-blue-500 py-1 outline-none"
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>

        {/* Signature Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Signature Type</label>
          <input
            type="text"
            value={signatureType}
            onChange={(e) => setSignatureType(e.target.value)}
            className="w-full border-b border-gray-300 focus:border-blue-500 py-1 outline-none"
            placeholder="e.g. Digital, Wet, Electronic"
          />
          {errors.signatureType && (
            <p className="text-red-500 text-sm mt-1">{errors.signatureType}</p>
          )}
        </div>

        {/* Signature Options */}
        <div className="col-span-2">
          <label className="block text-sm font-semibold mb-2 text-gray-800">Signature Method</label>
          <div className="flex gap-4 mb-4">
            <button
              type="button"
              className={`px-4 py-1 border rounded shadow-sm transition ${
                signatureMode === "upload"
                  ? "bg-[#029aaa] text-white px-6 py-2 rounded hover:bg-[#01c4d5] transition flex items-center gap-2"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
              onClick={() => setSignatureMode("upload")}
            >
              Upload
            </button>
            <button
              type="button"
              className={`px-4 py-1 border rounded shadow-sm transition ${
                signatureMode === "draw"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
              onClick={() => setSignatureMode("draw")}
            >
              Draw
            </button>
          </div>

          {signatureMode === "upload" && (
            <div>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileUpload}
                className="text-sm"
              />
              {signatureURL && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-1">Preview:</p>
                  <img
                    src={signatureURL}
                    alt="Signature Preview"
                    className="h-24 border border-gray-300 rounded shadow"
                  />
                </div>
              )}
              {errors.signature && (
                <p className="text-red-500 text-sm mt-1">{errors.signature}</p>
              )}
            </div>
          )}

          {signatureMode === "draw" && (
            <div className="mt-4">
              <canvas
                ref={canvasRef}
                width={300}
                height={120}
                className="border border-gray-400 rounded bg-white"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
              <button
                type="button"
                onClick={clearCanvas}
                className="mt-2 block text-sm text-blue-600 hover:underline"
              >
                Clear Signature
              </button>
              {errors.signature && (
                <p className="text-red-500 text-sm mt-1">{errors.signature}</p>
              )}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="col-span-2 mt-8 flex justify-center">
          <button
            type="submit"
            className="bg-[#029aaa] text-white px-6 py-2 rounded hover:bg-[#01c4d5] transition flex items-center gap-2"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

// const FundedForm = ({ onSubmitSuccess }) => {
//   const [amount, setAmount] = useState("");
//   const [fundDate, setFundDate] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Funding confirmed: ₹${amount} on ${fundDate}`);
// //     {

// // "applicationNumber": "APP1001",

// // "userId": "USR2001",

// // "fundingAmount": 15000.0,

// // "fundingDate": "2025-06-30",

// // "confirmFunding": true,

// // "createdBy": "admin",

// // "updatedBy": "admin"

// // }

//     onSubmitSuccess();
//   };

//   return (
//     <form onSubmit={handleSubmit} className="w-full h-screen p-6">
//       <h2 className="text-2xl font-bold mb-6">Funded</h2>

//       <div className="grid grid-cols-2 gap-6">
//         <div>
//           <label className="block text-gray-700 mb-1">Funding Amount</label>
//           <input
//             type="number"
//             className="border-b w-full focus:outline-none py-1"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 mb-1">Funding Date</label>
//           <input
//             type="date"
//             className="border-b w-full focus:outline-none py-1"
//             value={fundDate}
//             onChange={(e) => setFundDate(e.target.value)}
//             required
//           />
//         </div>
//       </div>

//       <button
//         type="submit"
//         className="bg-[#029aaa] text-white px-6 py-2 rounded hover:bg-[#01c4d5] transition flex items-center gap-2"
//       >
//         Confirm Funding
//       </button>
//     </form>
//   );
// };






const FundedForm = ({ onSubmitSuccess }) => {
  const [form, setForm] = useState({
    amount: "",
    fundDate: "",
    confirmFunding: false,
  });

  const [errors, setErrors] = useState({});

  // ✅ Fetch existing data from backend
  useEffect(() => {
    const fetchFundedData = async () => {
      const applicationNumber = sessionStorage.getItem("applicationNumber");
      const userId = sessionStorage.getItem("username");

      if (!applicationNumber || !userId) return;

      try {
        const response = await getFunded(applicationNumber, userId);
        if (response?.status === 200 && response.data) {
          const data = response.data;

          setForm({
            amount: data.fundingAmount?.toString() || "",
            fundDate: data.fundingDate || "",
            confirmFunding: data.confirmFunding || false,
          });
        }
      } catch (error) {
        console.error("❌ Error fetching funded data", error);
      }
    };

    fetchFundedData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.amount) newErrors.amount = "Funding amount is required";
    if (!form.fundDate) newErrors.fundDate = "Funding date is required";
    if (!form.confirmFunding) newErrors.confirmFunding = "You must confirm funding approval";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const applicationNumber = sessionStorage.getItem("applicationNumber");
    const userId = sessionStorage.getItem("username");
    const role = sessionStorage.getItem("role");

    if (!applicationNumber || !userId || !role) {
      alert("❌ Application number or user ID is missing.");
      return;
    }

    const payload = {
      applicationNumber,
      userId,
      fundingAmount: parseFloat(form.amount),
      fundingDate: form.fundDate,
      confirmFunding: form.confirmFunding,
      createdBy: role,
      updatedBy: role,
    };

    console.table(payload);

    const response = await addOrUpdateFundedInfo(payload);
    if (response?.status === 200) {
      alert(response.message || "Funding information submitted successfully.");
      onSubmitSuccess();
    } else {
      alert(response?.message || "Submission failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <h3 className="text-2xl font-bold col-span-2">Funding Information</h3>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-800">Funding Amount (₹)</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full border-b border-gray-300 focus:border-blue-500 py-1 outline-none"
            placeholder="e.g. 15000"
          />
          {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-800">Funding Date</label>
          <input
            type="date"
            name="fundDate"
            value={form.fundDate}
            onChange={handleChange}
            className="w-full border-b border-gray-300 focus:border-blue-500 py-1 outline-none"
          />
          {errors.fundDate && <p className="text-red-500 text-sm mt-1">{errors.fundDate}</p>}
        </div>

        <div className="col-span-2 mt-2">
          <label className="flex items-start gap-2 text-sm text-black-700">
            <input
              type="checkbox"
              name="confirmFunding"
              checked={form.confirmFunding}
              onChange={handleChange}
              className="mt-1 accent-blue-600"
            />
            <span>I confirm the funding has been approved and processed.</span>
          </label>
          {errors.confirmFunding && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmFunding}</p>
          )}
        </div>

        <div className="col-span-2 mt-8 flex justify-center">
          <button
            type="submit"
            className="bg-[#029aaa] text-white px-6 py-2 rounded hover:bg-[#01c4d5] transition flex items-center gap-2"
          >
            Confirm Funding
          </button>
        </div>
      </form>
    </div>
  );
};

