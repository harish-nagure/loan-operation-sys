import React, { useState } from "react";

const BussinessCustomerInfo = ({ form, handleChange, onContinue, canRead = false, canWrite = false }) => {
  const [errors, setErrors] = useState({});
  // console.log(canRead,canWrite+"FORM")
  const validate = () => {
    const newErrors = {};

    if (!form.companyLegalName || form.companyLegalName.trim() === "") {
      newErrors.companyLegalName = "Company Legal Name is required.";
    }

    if (!form.amountRequested || form.amountRequested.trim() === "") {
      newErrors.amountRequested = "Amount Requested is required.";
    }

    if (!form.firstName || form.firstName.trim() === "") {
      newErrors.firstName = "First Name is required.";
    }

    if (!form.lastName || form.lastName.trim() === "") {
      newErrors.lastName = "Last Name is required.";
    }

    if (!form.email || form.email.trim() === "") {
      newErrors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        newErrors.email = "Enter a valid email address.";
      }
    }

    if (!form.mobile || form.mobile.trim() === "") {
      newErrors.mobile = "Phone number is required.";
    } else {
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(form.mobile)) {
        newErrors.mobile = "Enter a valid 10-digit phone number.";
      }
    }

    return newErrors;
  };

  const handleContinueClick = (e) => {
    e.preventDefault(); 
    if(!canWrite)
    {
      alert("You don't have permission to countine with the form.");
      return
    }
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      if (typeof onContinue === "function") {
        onContinue();
      } else {
        console.warn("onContinue function is not passed");
      }
    }
  };

  return (
    <form onSubmit={handleContinueClick} className="w-full">
      <div className="grid grid-cols-2 gap-6">
        {/* Company Legal Name */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1">
            Company Legal Name
          </label>
          <input
            type="text"
            name="companyLegalName"
            value={form.companyLegalName || ""}
            onChange={handleChange}
            disabled={!canWrite}
            className={`w-full border-b py-1 focus:outline-none ${
              errors.companyLegalName
                ? "border-red-500"
                : "border-gray-400 focus:border-[#30c9d6]"
            }`}
          />
          {errors.companyLegalName && (
            <p className="text-red-500 text-xs mt-1">{errors.companyLegalName}</p>
          )}
        </div>

        {/* Amount Requested */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1">
            Amount Requested
          </label>
          <input
            type="text"
            name="amountRequested"
            value={form.amountRequested || ""}
            onChange={handleChange}
            disabled={!canWrite}
            className={`w-full border-b py-1 focus:outline-none ${
              errors.amountRequested
                ? "border-red-500"
                : "border-gray-400 focus:border-[#30c9d6]"
            }`}
          />
          {errors.amountRequested && (
            <p className="text-red-500 text-xs mt-1">{errors.amountRequested}</p>
          )}
        </div>

        {/* First Name */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1">
            Contact First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={form.firstName || ""}
            onChange={handleChange}
            disabled={!canWrite}
            className={`w-full border-b py-1 focus:outline-none ${
              errors.firstName
                ? "border-red-500"
                : "border-gray-400 focus:border-[#30c9d6]"
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1">
            Contact Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={form.lastName || ""}
            onChange={handleChange}
            disabled={!canWrite}
            className={`w-full border-b py-1 focus:outline-none ${
              errors.lastName
                ? "border-red-500"
                : "border-gray-400 focus:border-[#30c9d6]"
            }`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1">
            Contact Email ID
          </label>
          <input
            type="email"
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            disabled={!canWrite}
            className={`w-full border-b py-1 focus:outline-none ${
              errors.email
                ? "border-red-500"
                : "border-gray-400 focus:border-[#30c9d6]"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Mobile */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1">
            Contact Phone
          </label>
          <input
            type="text"
            name="mobile"
            value={form.mobile || ""}
            onChange={handleChange}
            disabled={!canWrite}
            className={`w-full border-b py-1 focus:outline-none ${
              errors.mobile
                ? "border-red-500"
                : "border-gray-400 focus:border-[#30c9d6]"
            }`}
          />
          {errors.mobile && (
            <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          disabled={!canWrite}
          type="submit"
          className="bg-[#30c9d6] text-white font-semibold px-6 py-2 rounded hover:bg-[#2bb7c3]"
        >
          Continue
        </button>
      </div>
    </form>
  );
};

export default BussinessCustomerInfo;
