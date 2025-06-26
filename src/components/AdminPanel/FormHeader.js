import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BussinessCustomerInfo from "./BussinessCustomerInfo";
import CompanyInfoForm from "./CompanyInfoForm";
import OwnerInfoForm from "./OwnerInfoForm";
import CollateralInfoForm from "./CollateralInfoForm";
import { FaUser, FaBuilding, FaUsers, FaFileSignature } from "react-icons/fa";
import DashboardHead from "./DashboardHead";
import DashboardSidebar from "./DashboardSidebar";

const FormHeader = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState("corporate");
  const navigate = useNavigate();

  const handleUserTypeChange = (e) => {
    const value = e.target.value;
    setUserType(value);
    if (value === "corporate") {
      navigate("/corporate_form"); 
    } else {
      navigate("/application-form")
    }
  };

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    companyLegalName: "",
    amountRequested: "",
  });

  const [companyInfo, setCompanyInfo] = useState({
    dba: "",
    ssnItin: "",
    businessAddress1: "",
    zipCode: "",
    city: "",
    state: "",
    revenue: "",
    timeInBusiness: "",
    typeOfBusiness: "",
    industry: "",
    taxId: "",
  });

  const [ownerInfo, setOwnerInfo] = useState([
    {
      firstName: "",
      lastName: "",
      dob: "",
      ownership: "",
      address1: "",
      address2: "",
      zipCode: "",
      city: "",
      state: "",
      bureauConsent: false,
      appConsent: false,
    },
  ]);

  const [collateralInfo, setCollateralInfo] = useState({
    collateralType: "",
    propertyType: "",
    isPrimaryResidence: "",
    streetAddress: "",
    zipCode: "",
    state: "",
    city: "",
    approvedValue: "",
    debt: "",
    lenderName: "",
    accountNumber: "",
    purchasePrice: "",
    purchaseDate: "",
    description: "",
  });

  const validateBasicInfo = () => {
    const { firstName, lastName, mobile, email, companyLegalName, amountRequested } = form;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      firstName.trim() &&
      lastName.trim() &&
      mobile.trim() &&
      emailRegex.test(email.trim()) &&
      companyLegalName.trim() &&
      amountRequested.trim()
    );
  };

  const validateCompanyInfo = () => {
    const {
      dba,
      ssnItin,
      businessAddress1,
      zipCode,
      city,
      state,
      revenue,
      timeInBusiness,
      typeOfBusiness,
      industry,
      taxId,
    } = companyInfo;

    const normalizedSSN = ssnItin.replace(/\D/g, "");
    return (
      dba.trim() &&
      normalizedSSN.length === 9 &&
      businessAddress1.trim() &&
      zipCode.trim() &&
      city.trim() &&
      state.trim() &&
      revenue.trim() &&
      timeInBusiness.trim() &&
      typeOfBusiness.trim() &&
      industry.trim() &&
      taxId.trim()
    );
  };

  const validateOwnerInfo = () => {
    for (const owner of ownerInfo) {
      if (
        !owner.firstName.trim() ||
        !owner.lastName.trim() ||
        !owner.dob.trim() ||
        !owner.ownership.trim() ||
        !owner.address1.trim() ||
        !owner.zipCode.trim() ||
        !owner.city.trim() ||
        !owner.state.trim() ||
        !owner.bureauConsent ||
        !owner.appConsent
      ) {
        return false;
      }
    }
    return true;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCompanyInfoChange = (data) => {
    setCompanyInfo(data);
  };

  const handleOwnerInfoChange = (updatedOwners) => {
    setOwnerInfo(updatedOwners);
  };

  const handleTabClick = (tab) => {
    if (tab === 1) setStep(1);
    else if (tab === 2) validateBasicInfo() ? setStep(2) : alert("Please complete Basic Info first.");
    else if (tab === 3) {
      if (!validateBasicInfo()) return alert("Please complete Basic Info first.");
      if (!validateCompanyInfo()) return alert("Please complete Company Info first.");
      setStep(3);
    } else if (tab === 4) {
      if (!validateBasicInfo()) return alert("Please complete Basic Info first.");
      if (!validateCompanyInfo()) return alert("Please complete Company Info first.");
      if (!validateOwnerInfo()) return alert("Please complete Owner Info first.");
      setStep(4);
    }
  };

  return (

            <div className="pr-8 py-8">
        <div className="bg-white rounded-lg shadow-md  py-8  px-12 mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Please select user type
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="userType"
                    value="retail"
                    checked={userType === "retail"}
                    onChange={handleUserTypeChange}
                  />
                  Retail
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="userType"
                    value="corporate"
                    checked={userType === "corporate"}
                    onChange={handleUserTypeChange}
                  />
                  Corporate
                </label>
              </div>
            </div>


        {/*  */}
          <div className="bg-white rounded-lg shadow-lg p-6 mt-4 w-full">

         

            {/* ✅ FORM TABS */}
            <div className="flex justify-start gap-8 mb-6 border-b border-gray-300">
              {[
                { step: 1, label: "Basic Info", icon: <FaUser className="mr-2" /> },
                { step: 2, label: "Company Info", icon: <FaBuilding className="mr-2" /> },
                { step: 3, label: "Owner Info", icon: <FaUsers className="mr-2" /> },
                { step: 4, label: "Collateral Info", icon: <FaFileSignature className="mr-2" /> },
              ].map((tab) => {
                const disabled =
                  (tab.step === 2 && !validateBasicInfo()) ||
                  (tab.step === 3 && (!validateBasicInfo() || !validateCompanyInfo())) ||
                  (tab.step === 4 &&
                    (!validateBasicInfo() || !validateCompanyInfo() || !validateOwnerInfo()));
                return (
                  <button
                    key={tab.step}
                    onClick={() => !disabled && handleTabClick(tab.step)}
                    disabled={disabled}
                    className={`flex items-center pb-2 font-semibold text-lg transition ${
                      step === tab.step
                        ? "text-[#30c9d6] border-b-4 border-[#30c9d6]"
                        : "text-gray-600 hover:text-[#30c9d6]"
                    } ${disabled ? "text-gray-400 cursor-not-allowed" : ""}`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* ✅ FORM CONTENT BY STEP */}
            <div className="w-full">
              {step === 1 && (
                <BussinessCustomerInfo
                  form={form}
                  handleChange={handleChange}
                  onContinue={() => {
                    if (validateBasicInfo()) setStep(2);
                    else alert("Please fill all Basic Info fields correctly.");
                  }}
                />
              )}
              {step === 2 && (
                <CompanyInfoForm
                  data={companyInfo}
                  onChange={handleCompanyInfoChange}
                  onBack={() => setStep(1)}
                  onContinue={() => {
                    if (validateCompanyInfo()) setStep(3);
                    else alert("SSN/ITIN must be exactly 9 digits and all fields filled.");
                  }}
                />
              )}
              {step === 3 && (
                <OwnerInfoForm
                  data={ownerInfo}
                  onChange={handleOwnerInfoChange}
                  onBack={() => setStep(2)}
                  onContinue={() => {
                    if (validateOwnerInfo()) setStep(4);
                    else alert("Please fill all Owner Info fields correctly.");
                  }}
                />
              )}
              {step === 4 && (
                <CollateralInfoForm
                  onBack={() => setStep(3)}
                  onContinue={() => alert("Form Submitted!")}
                />
              )}
            </div>
          </div>
        </div>
    
  );
};

export default FormHeader;
