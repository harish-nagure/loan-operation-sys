import React, { useState, useEffect } from "react";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli",
  "Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep",
  "Puducherry"
];

const OwnerInfoForm = ({ data, onChange, onBack, onContinue }) => {
  const [owners, setOwners] = useState(
    data.length > 0
      ? data.map(owner => ({ ...owner, errors: {} }))
      : [
          {
            firstName: "",
            lastName: "",
            dob: "",
            ownership: "0",
            address1: "",
            address2: "",
            zipCode: "",
            city: "",
            state: "",
            bureauConsent: false,
            appConsent: false,
            errors: {},
          },
        ]
  );

  useEffect(() => {
    setOwners(data.map(owner => ({ ...owner, errors: {} })));
  }, [data]);

  const handleInputChange = (idx, field, value) => {
    const newOwners = [...owners];
    newOwners[idx][field] = value;

    
    if (newOwners[idx].errors[field]) {
      newOwners[idx].errors[field] = "";
    }

    setOwners(newOwners);

   
    const ownersWithoutErrors = newOwners.map(({ errors, ...rest }) => rest);
    onChange(ownersWithoutErrors);
  };

  const validate = () => {
    let isValid = true;
    const newOwners = owners.map((owner) => {
      const errors = {};

      if (!owner.firstName.trim()) errors.firstName = "First name is required";
      if (!owner.lastName.trim()) errors.lastName = "Last name is required";
      if (!owner.dob.trim()) errors.dob = "Date of birth is required";
      if (!owner.ownership.toString().trim()) errors.ownership = "Ownership % is required";
      else if (isNaN(owner.ownership) || owner.ownership <= 0 || owner.ownership > 100)
        errors.ownership = "Ownership % must be between 1 and 100";

      if (!owner.address1.trim()) errors.address1 = "Address Line 1 is required";
      if (!owner.zipCode.trim()) errors.zipCode = "Zip code is required";
      else if (!/^\d{5,10}$/.test(owner.zipCode))
        errors.zipCode = "Zip code must be 5 to 10 digits";

      if (!owner.city.trim()) errors.city = "City is required";
      if (!owner.state.trim()) errors.state = "State is required";

      if (!owner.bureauConsent) errors.bureauConsent = "Bureau consent is required";
      if (!owner.appConsent) errors.appConsent = "Application consent is required";

      if (Object.keys(errors).length > 0) {
        isValid = false;
      }

      return { ...owner, errors };
    });

    const totalOwnership = owners.reduce((sum, o) => sum + Number(o.ownership || 0), 0);
    if (totalOwnership < 70) {
      alert("Total ownership must be at least 70%");
      isValid = false;
    }

    setOwners(newOwners);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const ownersWithoutErrors = owners.map(({ errors, ...rest }) => rest);
      onContinue(ownersWithoutErrors);
    }
  };

  const addOwner = () => {
    setOwners([
      ...owners,
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
        errors: {},
      },
    ]);
  };

  const removeOwner = (idx) => {
    if (owners.length === 1) return; 
    const newOwners = owners.filter((_, i) => i !== idx);
    setOwners(newOwners);
    const ownersWithoutErrors = newOwners.map(({ errors, ...rest }) => rest);
    onChange(ownersWithoutErrors);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 w-full mx-auto">
      {owners.map((owner, idx) => (
      <div key={idx} className="mb-8  p-4 rounded-md">
  {owners.length > 1 && (
    <div className="text-right mb-2">
      <button
        type="button"
        onClick={() => removeOwner(idx)}
        className="text-red-600 hover:text-red-800"
      >
        Remove
      </button>
    </div>
  )}

  {/* First Name & Last Name */}
  <div className="grid grid-cols-2 gap-4 mb-3">
    <div>
      <label className="block font-semibold mb-1">Owner First Name</label>
      <input
        type="text"
        value={owner.firstName}
        onChange={(e) => handleInputChange(idx, "firstName", e.target.value)}
        className={`w-full border-b border-gray-400 bg-transparent py-1 focus:outline-none ${
          owner.errors.firstName ? "border-red-500" : ""
        }`}
      />
      {owner.errors.firstName && (
        <p className="text-red-600 text-sm mt-1">{owner.errors.firstName}</p>
      )}
    </div>

    <div>
      <label className="block font-semibold mb-1">Owner Last Name</label>
      <input
        type="text"
        value={owner.lastName}
        onChange={(e) => handleInputChange(idx, "lastName", e.target.value)}
        className={`w-full border-b border-gray-400 bg-transparent py-1 focus:outline-none ${
          owner.errors.lastName ? "border-red-500" : ""
        }`}
      />
      {owner.errors.lastName && (
        <p className="text-red-600 text-sm mt-1">{owner.errors.lastName}</p>
      )}
    </div>
  </div>

  {/* DOB & Ownership */}
  <div className="grid grid-cols-2 gap-4 mb-3">
    <div>
      <label className="block font-semibold mb-1">Date of Birth</label>
      <input
        type="date"
        value={owner.dob}
        onChange={(e) => handleInputChange(idx, "dob", e.target.value)}
        className={`w-full border-b border-gray-400 bg-transparent py-1 focus:outline-none ${
          owner.errors.dob ? "border-red-500" : ""
        }`}
      />
      {owner.errors.dob && (
        <p className="text-red-600 text-sm mt-1">{owner.errors.dob}</p>
      )}
    </div>

    <div className="relative">
      <label className="block font-semibold mb-1">Ownership Percentage</label>
      <input
        type="number"
        value={owner.ownership}
        onChange={(e) => handleInputChange(idx, "ownership", e.target.value)}
        className={`w-full border-b border-gray-400 bg-transparent py-1 pr-6 focus:outline-none ${
          owner.errors.ownership ? "border-red-500" : ""
        }`}
      />
      <span className="absolute right-2 top-[38px] text-gray-600 text-base pointer-events-none">%</span>
      {owner.errors.ownership && (
        <p className="text-red-600 text-sm mt-1">{owner.errors.ownership}</p>
      )}
    </div>
  </div>

  {/* Address Line 1 & 2 */}
  <div className="grid grid-cols-2 gap-4 mb-3">
    <div>
      <label className="block font-semibold mb-1">Address Line 1</label>
      <input
        type="text"
        value={owner.address1}
        onChange={(e) => handleInputChange(idx, "address1", e.target.value)}
        className={`w-full border-b border-gray-400 bg-transparent py-1 focus:outline-none ${
          owner.errors.address1 ? "border-red-500" : ""
        }`}
      />
      {owner.errors.address1 && (
        <p className="text-red-600 text-sm mt-1">{owner.errors.address1}</p>
      )}
    </div>

    <div>
      <label className="block font-semibold mb-1">Address Line 2 (optional)</label>
      <input
        type="text"
        value={owner.address2}
        onChange={(e) => handleInputChange(idx, "address2", e.target.value)}
        className="w-full border-b border-gray-400 bg-transparent py-1 focus:outline-none"
      />
    </div>
  </div>

  {/* Zip Code & City */}
  <div className="grid grid-cols-2 gap-4 mb-3">
    <div>
      <label className="block font-semibold mb-1">Zip Code</label>
      <input
        type="text"
        value={owner.zipCode}
        onChange={(e) => handleInputChange(idx, "zipCode", e.target.value.replace(/\D/g, ""))}
        className={`w-full border-b border-gray-400 bg-transparent py-1 focus:outline-none ${
          owner.errors.zipCode ? "border-red-500" : ""
        }`}
      />
      {owner.errors.zipCode && (
        <p className="text-red-600 text-sm mt-1">{owner.errors.zipCode}</p>
      )}
    </div>

    <div>
      <label className="block font-semibold mb-1">City</label>
      <input
        type="text"
        value={owner.city}
        onChange={(e) => handleInputChange(idx, "city", e.target.value)}
        className={`w-full border-b border-gray-400 bg-transparent py-1 focus:outline-none ${
          owner.errors.city ? "border-red-500" : ""
        }`}
      />
      {owner.errors.city && (
        <p className="text-red-600 text-sm mt-1">{owner.errors.city}</p>
      )}
    </div>
  </div>

  {/* State */}
  <div className="mb-3">
    <label className="block font-semibold mb-1">State</label>
    <select
      value={owner.state}
      onChange={(e) => handleInputChange(idx, "state", e.target.value)}
      className={`w-full border-b border-gray-400 bg-transparent py-1 focus:outline-none ${
        owner.errors.state ? "border-red-500" : ""
      }`}
    >
      <option value="">Select State</option>
      {indianStates.map((st) => (
        <option key={st} value={st}>{st}</option>
      ))}
    </select>
    {owner.errors.state && (
      <p className="text-red-600 text-sm mt-1">{owner.errors.state}</p>
    )}
  </div>

  {/* Ownership Statement */}
  <div className="mb-3 text-gray-700 text-sm italic">
    Please enter owner's information comprising at least 70% total ownership.
  </div>

  {/* Consents */}
  <div className="mb-4 space-y-2">
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={owner.bureauConsent}
        onChange={(e) => handleInputChange(idx, "bureauConsent", e.target.checked)}
        className="w-4 h-4"
      />
      <span>I authorize NewCo Financial to pull Credit Report</span>
    </label>
    {owner.errors.bureauConsent && (
      <p className="text-red-600 text-sm">{owner.errors.bureauConsent}</p>
    )}

    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={owner.appConsent}
        onChange={(e) => handleInputChange(idx, "appConsent", e.target.checked)}
        className="w-4 h-4"
      />
      <span>Application Consent</span>
    </label>
    {owner.errors.appConsent && (
      <p className="text-red-600 text-sm">{owner.errors.appConsent}</p>
    )}
  </div>
</div>

      ))}

      {/* Add Owner Button */}
    <div className="flex justify-between items-center mt-8">
        <button
    type="button"
    onClick={onBack}
    className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
  >
    Back
  </button>
      
       <div className="flex gap-4">
         <button
          type="button"
          onClick={() => {
            const newOwners = [
              ...owners,
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
                errors: {},
              },
            ];
            setOwners(newOwners);
            onChange(newOwners.map(({ errors, ...rest }) => rest));
          }}
        className="bg-[#30c9d6] text-white font-semibold px-6 py-2 rounded hover:bg-[#2bb7c3]"
        >
          Add Owner
        </button>
        
        <button
          type="submit"
        className="bg-[#30c9d6] text-white font-semibold px-6 py-2 rounded hover:bg-[#2bb7c3]"
        >
          Continue
        </button>
      </div>
      </div>
    </form>
  );
};

export default OwnerInfoForm;
