import React, { useState } from "react";

const CollateralInfoForm = () => {
  const [form, setForm] = useState({
    collateralType: "",
    propertyType: "",
    isPrimaryResidential: "",
    streetAddress: "",
    zipCode: "",
    state: "",
    city: "",
    approvedValue: "",
    debt: "",
    validationDate: "",
    assignedLTV: "",
    perfectionStatus: "",
    isReleased: "",
    country: "",
  });

  const [errors, setErrors] = useState({});

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
    "West Bengal"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    Object.entries(form).forEach(([field, value]) => {
      if (!value) {
        newErrors[field] = "This field is required";
      }

      if (
        (field === "isPrimaryResidential" || field === "isReleased") &&
        value !== "Yes" &&
        value !== "No"
      ) {
        newErrors[field] = "Only Yes or No is allowed";
      }

      if (field === "zipCode" && value && !/^\d{5,6}$/.test(value.trim())) {
        newErrors[field] = "Zip Code must be 5 or 6 digits and contain only numbers";
      }

      if (field === "debt" && value && isNaN(value)) {
        newErrors[field] = "Enter a valid number";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted", form);
      alert("Form Submitted");
      // Form submission logic here
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="w-1/2">
        <label>Collateral Type</label><br />
        <select
          name="collateralType"
          value={form.collateralType}
          onChange={handleChange}
          className="w-full border-b border-gray-400 focus:outline-none p-2"
        >
          <option value="">Select</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Vehicle">Vehicle</option>
          <option value="Cash">Cash</option>
        </select>
        {errors.collateralType && <p className="text-red-500">{errors.collateralType}</p>}
      </div>

      <div className="flex gap-4">
        <div className="w-1/2">
          <label>Property Type</label>
          <select
            name="propertyType"
            value={form.propertyType}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none p-2"
          >
            <option value="">Select</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>
          {errors.propertyType && <p className="text-red-500">{errors.propertyType}</p>}
        </div>
        <div className="w-1/2">
          <p className="font-semibold">Primary Residential</p>
          <div className="flex gap-4 mt-1">
            <label>
              <input
                type="radio"
                name="isPrimaryResidential"
                value="Yes"
                checked={form.isPrimaryResidential === "Yes"}
                onChange={handleChange}
              />{" "}
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="isPrimaryResidential"
                value="No"
                checked={form.isPrimaryResidential === "No"}
                onChange={handleChange}
              />{" "}
              No
            </label>
          </div>
          {errors.isPrimaryResidential && (
            <p className="text-red-500">{errors.isPrimaryResidential}</p>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-1/2">
          <label>Property Street Address</label>
          <input
            type="text"
            name="streetAddress"
            value={form.streetAddress}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none p-2"
          />
          {errors.streetAddress && <p className="text-red-500">{errors.streetAddress}</p>}
        </div>
        <div className="w-1/2">
          <label>Zip Code</label>
          <input
            type="text"
            name="zipCode"
            value={form.zipCode}
            onChange={handleChange}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
            className="w-full border-b border-gray-400 focus:outline-none p-2"
          />
          {errors.zipCode && <p className="text-red-500">{errors.zipCode}</p>}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-1/2">
          <label>State</label>
          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none p-2"
          >
            <option value="">Select</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && <p className="text-red-500">{errors.state}</p>}
        </div>
        <div className="w-1/2">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none p-2"
          />
          {errors.city && <p className="text-red-500">{errors.city}</p>}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-1/2">
          <label>Approved Value</label>
          <input
            type="text"
            name="approvedValue"
            value={form.approvedValue}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none p-2"
          />
          {errors.approvedValue && <p className="text-red-500">{errors.approvedValue}</p>}
        </div>
        <div className="w-1/2">
          <label>Debt</label>
          <input
            type="number"
            name="debt"
            value={form.debt}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none p-2"
          />
          {errors.debt && <p className="text-red-500">{errors.debt}</p>}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-1/2">
          <label>Validation Date</label>
          <input
            type="date"
            name="validationDate"
            value={form.validationDate}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none p-2"
          />
          {errors.validationDate && <p className="text-red-500">{errors.validationDate}</p>}
        </div>
        <div className="w-1/2">
          <label>Assigned LTV</label>
          <input
            type="text"
            name="assignedLTV"
            value={form.assignedLTV}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none p-2"
          />
          {errors.assignedLTV && <p className="text-red-500">{errors.assignedLTV}</p>}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-1/2">
          <label>Perfection Status</label>
          <select
            name="perfectionStatus"
            value={form.perfectionStatus}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none p-2"
          >
            <option value="">Select</option>
            <option value="In Process">In Process</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.perfectionStatus && <p className="text-red-500">{errors.perfectionStatus}</p>}
        </div>

        <div className="w-1/2">
          <p className="font-semibold">Released</p>
          <div className="flex gap-4 mt-1">
            <label>
              <input
                type="radio"
                name="isReleased"
                value="Yes"
                checked={form.isReleased === "Yes"}
                onChange={handleChange}
              />{" "}
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="isReleased"
                value="No"
                checked={form.isReleased === "No"}
                onChange={handleChange}
              />{" "}
              No
            </label>
          </div>
          {errors.isReleased && <p className="text-red-500">{errors.isReleased}</p>}
        </div>
      </div>

      <div className="w-1/2">
        <label>Country</label>
        <input
          type="text"
          name="country"
          value={form.country}
          onChange={handleChange}
          className="w-full border-b border-gray-400 focus:outline-none p-2"
        />
        {errors.country && <p className="text-red-500">{errors.country}</p>}
      </div>

      {/* Buttons container */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={() => {
            setForm({
              collateralType: "",
              propertyType: "",
              isPrimaryResidential: "",
              streetAddress: "",
              zipCode: "",
              state: "",
              city: "",
              approvedValue: "",
              debt: "",
              validationDate: "",
              assignedLTV: "",
              perfectionStatus: "",
              isReleased: "",
              country: "",
            });
            setErrors({});
          }}
          className="bg-gray-300 text-gray-700 font-semibold px-6 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>

        <button
          type="submit"
          alert
          className="bg-[#30c9d6] text-white font-semibold px-6 py-2 rounded hover:bg-[#2bb7c3]"
          
          
           
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CollateralInfoForm;
