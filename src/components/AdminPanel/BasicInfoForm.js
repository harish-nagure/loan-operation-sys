import React, { useState, useEffect } from "react";
import smartphone from "../../Image/smartphone.png";

// import PropTypes from "prop-types";

const BasicInfoForm = ({ form, handleChange, onContinue, fieldSettings, canRead = false, canWrite = false }) => {
  const [errors, setErrors] = useState({});
  const [dynamicFields, setDynamicFields] = useState([]);
  console.log(canRead,canWrite+"Helooo basic")
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("dynamicFields")) || {};
    setDynamicFields(saved.basicInfo || []);
  }, []);

  const validate = () => {
    const newErrors = {};

    if (fieldSettings.firstName !== false && !form.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (fieldSettings.lastName !== false && !form.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (fieldSettings.mobile !== false) {
      if (!form.mobile.trim()) {
        newErrors.mobile = "Mobile number is required.";
      } else if (!/^\d{10}$/.test(form.mobile)) {
        newErrors.mobile = "Enter a valid 10-digit phone number.";
      }
    }

    if (fieldSettings.email !== false) {
      if (!form.email.trim()) {
        newErrors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        newErrors.email = "Enter a valid email address.";
      }
    }

    if (fieldSettings.confirmEmail !== false) {
      if (!form.confirmEmail.trim()) {
        newErrors.confirmEmail = "Please confirm your email.";
      } else if (form.confirmEmail !== form.email) {
        newErrors.confirmEmail = "Emails do not match.";
      }
    }

    // Validate dynamic fields (only required ones)
    dynamicFields.forEach((field) => {
      if (fieldSettings[field] !== false && !form[field]?.trim()) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onContinue();
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Basic Info</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
        {fieldSettings.firstName !== false && (
          <div className="flex-1 flex flex-col">
            <label htmlFor="firstName" className="mb-1 font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              disabled={!canWrite}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-[#30c9d6] py-2"
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>
        )}

        {fieldSettings.lastName !== false && (
          <div className="flex-1 flex flex-col">
            <label htmlFor="lastName" className="mb-1 font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              disabled={!canWrite}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-[#30c9d6] py-2"
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>
        )}
      </div>

      {fieldSettings.mobile !== false && (
        <div className="mb-6 w-full flex flex-col">
          <label htmlFor="mobile" className="mb-1 font-medium text-gray-700">
            Mobile Phone
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            disabled={!canWrite}
            className="border-b border-gray-400 focus:outline-none focus:border-[#30c9d6] py-2"
            style={{ maxWidth: "280px" }}
          />
          {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
        {fieldSettings.email !== false && (
          <div className="flex-1 flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700">
              Email (Personal)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={!canWrite}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-[#30c9d6] py-2"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
        )}

        {fieldSettings.confirmEmail !== false && (
          <div className="flex-1 flex flex-col">
            <label htmlFor="confirmEmail" className="mb-1 font-medium text-gray-700">
              Confirm Email
            </label>
            <input
              type="email"
              id="confirmEmail"
              name="confirmEmail"
              value={form.confirmEmail}
              onChange={handleChange}
              disabled={!canWrite}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-[#30c9d6] py-2"
            />
            {errors.confirmEmail && <p className="text-red-500 text-sm">{errors.confirmEmail}</p>}
          </div>
        )}
      </div>

      {/* Dynamically render extra fields */}
      {dynamicFields.map((field) => (
        fieldSettings[field] !== false && (
          <div key={field} className="mb-6 w-full flex flex-col">
            <label htmlFor={field} className="mb-1 font-medium text-gray-700 capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type={
                field.toLowerCase().includes("email")
                  ? "email"
                  : field.toLowerCase().includes("date")
                  ? "date"
                  : field.toLowerCase().includes("number")
                  ? "number"
                  : "text"
              }
              id={field}
              name={field}
              value={form[field] || ""}
              onChange={handleChange}
              disabled={!canWrite}
              className="border-b border-gray-400 focus:outline-none focus:border-[#30c9d6] py-2"
            />
            {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
          </div>
        )
      ))}

      <div className="flex items-start gap-3 mb-6">
        <img src={smartphone} alt="Smartphone" className="w-6 h-6 mt-1 flex-shrink-0" />
        <p className="text-sm text-gray-700">
          By choosing to proceed, I agree to the electronic Communication and E-Sign Agreement,
          as well as to receive communications by phone or Email from Druk PNB Bank Ltd.
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-[#029aaa] text-white px-6 py-2 rounded hover:bg-[#01c4d5] transition flex items-center gap-2"
        >
          Continue
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="mt-6 text-center text-sm">
        <span style={{ color: "black" }}>
          Druk PNB Bank Ltd.'s{" "}
          <a
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[#005f99]"
          >
            Terms and Authorization
          </a>
        </span>
        <span style={{ color: "black", margin: "0 6px" }}>and</span>
        <a
          href="/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-[#005f99]"
        >
          Privacy Policy and Notices
        </a>
      </div>
    </div>
  );
};

export default BasicInfoForm;