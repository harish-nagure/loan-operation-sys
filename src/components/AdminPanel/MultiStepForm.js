import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle, FileText } from "lucide-react";
import BasicInfoForm from "./BasicInfoForm";
import ApplicationDetailForm from "./ApplicationDetailForm";
import DashboardHead from "./DashboardHead";
import DashboardSidebar from "./DashboardSidebar";
import { getUserById } from "../api_service";

const MultiStepForm = ({ fieldSettings = {} }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({});
  const [dynamicFields, setDynamicFields] = useState([]);
  const [selectedFormType, setSelectedFormType] = useState("retail");

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (selectedFormType === "corporate") {
      navigate("/form_header");
    }
  }, [selectedFormType, navigate]);

  // useEffect(async () => {
  //   const saved = JSON.parse(localStorage.getItem("dynamicFields")) || {};
  //   const basicInfoDynamic = saved.basicInfo || [];
  //   setDynamicFields(basicInfoDynamic);
  //   const data_json = await getUserById(sessionStorage.getItem("userId"));
  //   console.log("User data:", data_json);
  //   const initialForm = {
  //     firstName: "",
  //     lastName: "",
  //     mobile: "",
  //     email: "",
  //     confirmEmail: "",
  //     ...Object.fromEntries(basicInfoDynamic.map((field) => [field, ""])),
  //   };

  //   setForm(initialForm);
  // }, []);
useEffect(() => {
  (async () => {
    const saved = JSON.parse(localStorage.getItem("dynamicFields")) || {};
    const basicInfoDynamic = saved.basicInfo || [];
    setDynamicFields(basicInfoDynamic);
    
    const data_json = await getUserById(sessionStorage.getItem("username"));

    const data = data_json?.data;
    console.log("User data:", data_json);

    const initialForm = {
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      mobile: data.phone || "",
      email: data.email || "",
      confirmEmail: data.email || "",
      ...Object.fromEntries(basicInfoDynamic.map((field) => [field, ""])),
    };

    setForm(initialForm);
  })();
}, []);

  const [detail, setDetail] = useState({
    dob: "",
    monthlyIncome: "",
    ssn: "",
    confirmSsn: "",
    amountNeeded: "",
    homeAddress: "",
    homeAddress2: "",
    zipCode: "",
    city: "",
    state: "",
    homeowner: "",
    agreeTerms: false,
    authorizeCredit: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetailChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDetail((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateBasicInfo = () => {
    if (fieldSettings.firstName !== false && !(form.firstName || "").trim()) return false;
    if (fieldSettings.lastName !== false && !(form.lastName || "").trim()) return false;
    if (
      fieldSettings.mobile !== false &&
      (!(form.mobile || "").trim() || !/^\d{10}$/.test(form.mobile))
    )
      return false;
    if (
      fieldSettings.email !== false &&
      (!(form.email || "").trim() || !/\S+@\S+\.\S+/.test(form.email))
    )
      return false;
    if (
      fieldSettings.confirmEmail !== false &&
      (!(form.confirmEmail || "").trim() || form.confirmEmail !== form.email)
    )
      return false;
    for (let field of dynamicFields) {
      if (fieldSettings[field] !== false && !(form[field] || "").trim()) {
        return false;
      }
    }
    return true;
  };

  const handleTabClick = (tab) => {
    if (tab === 1) {
      setStep(1);
    } else if (tab === 2) {
      if (validateBasicInfo()) {
        setStep(2);
      } else {
        alert("Please complete the Basic Info form correctly before continuing.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <DashboardSidebar />

      <div className="flex-1 p-4">
        <DashboardHead />

        {/* 🔘 User Type Selection */}
        <div className="bg-white rounded-lg shadow-md  py-8  px-12 mb-4">
          <p className="text-gray-700 font-medium mb-2">Please select user type</p>
          <div className="flex gap-6">
            <label className="flex items-center gap-2" >
              <input
                type="radio"
                name="formType"
                value="retail"
                checked={selectedFormType === "retail"}
                onChange={() => setSelectedFormType("retail")}
              />
              Retail
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="formType"
                value="corporate"
                checked={selectedFormType === "corporate"}
                onChange={() => setSelectedFormType("corporate")}
              />
              Corporate
            </label>
          </div>
        </div>

        {/* 👇 Form Tabs */}
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-full mt-4">
          <div className="flex justify-start gap-8 mb-6 border-b border-gray-300">
            <button
              onClick={() => handleTabClick(1)}
              className={`relative pb-2 font-semibold text-lg flex items-center gap-2 ${
                step === 1
                  ? "text-[#30c9d6] after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-[#30c9d6]"
                  : "text-gray-600 hover:text-[#30c9d6]"
              }`}
            >
              <UserCircle className="w-5 h-5" />
              Basic Detail
            </button>

            <button
              onClick={() => validateBasicInfo() && handleTabClick(2)}
              className={`relative pb-2 font-semibold text-lg flex items-center gap-2 ${
                step === 2
                  ? "text-[#30c9d6] after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-[#30c9d6]"
                  : validateBasicInfo()
                  ? "text-gray-600 hover:text-[#30c9d6]"
                  : "text-gray-400 cursor-not-allowed"
              }`}
              disabled={!validateBasicInfo()}
              title={validateBasicInfo() ? "" : "Please complete Basic Info first"}
              style={{ pointerEvents: validateBasicInfo() ? "auto" : "none" }}
            >
              <FileText className="w-5 h-5" />
              Application Detail
            </button>
          </div>

          {/* 👇 Form Steps */}
          <div className="w-full mt-6">
            {step === 1 ? (
              <BasicInfoForm
                form={form}
                handleChange={handleChange}
                onContinue={() => setStep(2)}
                fieldSettings={fieldSettings}
                dynamicFields={dynamicFields}
              />
            ) : (
              <ApplicationDetailForm
                detail={detail}
                handleDetailChange={handleDetailChange}
                onBack={() => setStep(1)}
                onContinue={() => alert("Form Submitted!")}
                fieldSettings={fieldSettings}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
