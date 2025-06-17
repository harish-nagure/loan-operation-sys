import React, { useState, useEffect } from "react";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi",
  "Jammu and Kashmir", "Ladakh", "Puducherry"
];

const industries = [
  "Agriculture", "Construction", "Education", "Finance", "Healthcare",
  "Hospitality", "Information Technology", "Manufacturing", "Retail",
  "Real Estate", "Transportation", "Utilities", "Other"
];

const CompanyInfoForm = ({ data, onChange, onBack, onContinue }) => {
  const [form, setForm] = useState({
    dba: "",
    ssnItin: "",
    businessAddress1: "",
    businessAddress2: "",
    zipCode: "",
    city: "",
    state: "",
    revenue: "",
    timeInBusiness: "",
    typeOfBusiness: "",
    industry: "",
    taxId: "",
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

 
  useEffect(() => {
    if (data) {
      setForm(prev => ({ ...prev, ...data }));
    }
  }, [data]);

  const validate = () => {
    const newErrors = {};
    if (!form.dba.trim()) newErrors.dba = "DBA is required";
    if (!form.ssnItin.trim()) newErrors.ssnItin = "SSN/ITIN is required";
    else if (!/^\d{9}$/.test(form.ssnItin)) newErrors.ssnItin = "SSN/ITIN must be 9 digits";

    if (!form.businessAddress1.trim()) newErrors.businessAddress1 = "Address is required";
    if (!form.zipCode.trim()) newErrors.zipCode = "Zip code is required";
    else if (!/^\d{5,6}$/.test(form.zipCode)) newErrors.zipCode = "Invalid zip code";

    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!form.revenue.trim() || isNaN(form.revenue)) newErrors.revenue = "Valid revenue required";

    if (!form.timeInBusiness.trim()) newErrors.timeInBusiness = "Time in business is required";
    if (!form.typeOfBusiness.trim()) newErrors.typeOfBusiness = "Business type is required";
    if (!form.industry.trim()) newErrors.industry = "Industry is required";
    if (!form.taxId.trim()) newErrors.taxId = "Tax ID is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let val = value;
    if (name === "ssnItin") {
     
      val = value.replace(/\D/g, "");
    }
    
    setForm(prev => ({ ...prev, [name]: val }));
    
    if (onChange) {
      onChange({ ...form, [name]: val });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitError("");
      onContinue(form);
    } else {
      setSubmitError("Please fill all Company Info fields correctly.");
    }
  };

  const inputClass = (field) =>
    `w-full border-0 border-b-2 py-1 focus:outline-none focus:border-blue-600 ${
      errors[field] ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 w-full mx-auto">
      {submitError && (
        <div className="text-red-600 text-sm font-semibold">{submitError}</div>
      )}

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block mb-1 font-medium">DBA</label>
          <input
            name="dba"
            value={form.dba}
            onChange={handleChange}
            className={inputClass("dba")}
          />
          {errors.dba && <p className="text-red-600 text-sm">{errors.dba}</p>}
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-medium">SSN/ITIN</label>
          <input
            type="text"
            name="ssnItin"
            value={form.ssnItin}
            onChange={handleChange}
            maxLength={9}
            placeholder="Enter 9-digit SSN/ITIN"
            className={inputClass("ssnItin")}
          />
          {errors.ssnItin && <p className="text-red-600 text-sm">{errors.ssnItin}</p>}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block mb-1 font-medium">Business Address 1</label>
          <input
            name="businessAddress1"
            value={form.businessAddress1}
            onChange={handleChange}
            className={inputClass("businessAddress1")}
          />
          {errors.businessAddress1 && (
            <p className="text-red-600 text-sm">{errors.businessAddress1}</p>
          )}
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-medium">Business Address 2</label>
          <input
            type="text"
            name="businessAddress2"
            value={form.businessAddress2}
            onChange={handleChange}
            className={inputClass("businessAddress2")}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block mb-1 font-medium">Zip Code</label>
          <input
            name="zipCode"
            value={form.zipCode}
            onChange={handleChange}
            className={inputClass("zipCode")}
          />
          {errors.zipCode && <p className="text-red-600 text-sm">{errors.zipCode}</p>}
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-medium">City</label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            className={inputClass("city")}
          />
          {errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block mb-1 font-medium">State</label>
          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            className={inputClass("state")}
          >
            <option value="">Select</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && <p className="text-red-600 text-sm">{errors.state}</p>}
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-medium">Revenue</label>
          <input
            name="revenue"
            value={form.revenue}
            onChange={handleChange}
            className={inputClass("revenue")}
          />
          {errors.revenue && <p className="text-red-600 text-sm">{errors.revenue}</p>}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block mb-1 font-medium">Time in Business</label>
          <input
            type="date"
            name="timeInBusiness"
            value={form.timeInBusiness}
            onChange={handleChange}
            className={inputClass("timeInBusiness")}
          />
          {errors.timeInBusiness && (
            <p className="text-red-600 text-sm">{errors.timeInBusiness}</p>
          )}
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-medium">Type of Business</label>
          <select
            name="typeOfBusiness"
            value={form.typeOfBusiness}
            onChange={handleChange}
            className={inputClass("typeOfBusiness")}
          >
            <option value="">Select</option>
            <option value="Sole Proprietorship">Sole Proprietorship</option>
            <option value="Partnership">Partnership</option>
            <option value="Corporation">Corporation</option>
            <option value="LLC">LLC</option>
          </select>
          {errors.typeOfBusiness && (
            <p className="text-red-600 text-sm">{errors.typeOfBusiness}</p>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block mb-1 font-medium">Industry</label>
          <select
            name="industry"
            value={form.industry}
            onChange={handleChange}
            className={inputClass("industry")}
          >
            <option value="">Select</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
          {errors.industry && (
            <p className="text-red-600 text-sm">{errors.industry}</p>
          )}
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-medium">Tax ID</label>
          <input
            name="taxId"
            value={form.taxId}
            onChange={handleChange}
            className={inputClass("taxId")}
          />
          {errors.taxId && <p className="text-red-600 text-sm">{errors.taxId}</p>}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-[#30c9d6] text-white font-semibold px-6 py-2 rounded hover:bg-[#2bb7c3]"
        >
          Continue
        </button>
      </div>
    </form>
  );
};

export default CompanyInfoForm;
