import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { submitApplicationDetails } from "../api_service";

const ApplicationDetailForm = ({detail,handleDetailChange,fieldSettings, canRead = false, canWrite = false }) => {
  const navigate = useNavigate();
  const [dob, setDob] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [ssn, setSsn] = useState("");
  const [confirmSsn, setConfirmSsn] = useState("");
  const [amountNeeded, setAmountNeeded] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [homeAddress2, setHomeAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [homeowner, setHomeowner] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [authorizeCredit, setAuthorizeCredit] = useState(false);


  console.log(canWrite,canRead)
  const [errors, setErrors] = useState({});

  const states = [
    "",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  const validate = () => {
    const newErrors = {};

    if (!detail.dob) newErrors.dob = "Date of Birth is required.";
    if (!detail.monthlyIncome) newErrors.monthlyIncome = "Monthly income is required.";
    else if (isNaN(detail.monthlyIncome)) newErrors.monthlyIncome = "Monthly income must be a number.";

    if (!detail.ssn) newErrors.ssn = "SSN is required.";
    else if (!/^\d{9}$/.test(detail.ssn)) newErrors.ssn = "SSN must be exactly 9 digits.";

    if (!detail.confirmSsn) newErrors.confirmSsn = "Please confirm SSN.";
    else if (detail.ssn !== detail.confirmSsn) newErrors.confirmSsn = "SSN and Confirm SSN must match.";

    if (!detail.amountNeeded) newErrors.amountNeeded = "Amount needed is required.";
    else if (isNaN(detail.amountNeeded)) newErrors.amountNeeded = "Amount needed must be a number.";

    if (!detail.homeAddress) newErrors.homeAddress = "Home address is required.";

    if (!detail.zipCode) newErrors.zipCode = "Zip code is required.";
    else if (!/^\d{5,6}$/.test(detail.zipCode)) newErrors.zipCode = "Zip code must be 5 or 6 digits.";

    if (!detail.city) newErrors.city = "City is required.";
    if (!detail.state) newErrors.state = "State is required.";
    if (!detail.homeowner) newErrors.homeowner = "Please select homeowner status.";

    if (!detail.agreeTerms) newErrors.agreeTerms = "You must agree to the terms.";
    if (!detail.authorizeCredit) newErrors.authorizeCredit = "You must authorize credit report.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     alert("Form submitted successfully!");
      
  //   }
  // };

    // alert(canWrite)
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!canWrite) {
        alert("You don't have permission to submit the form.");
        return;
      }
      if (validate()) {
        try {
          
          const requestData = {
            userId: sessionStorage.getItem("username"),
            dateOfBirth: detail.dob,
            monthlyGrossIncome: parseFloat(detail.monthlyIncome),
            ssn: detail.ssn,
            confirmSsn: detail.confirmSsn,
            howMuchDoYouNeed: parseFloat(detail.amountNeeded),
            homeAddress: detail.homeAddress,
            homeAddress2: detail.homeAddress2,
            zipCode: parseInt(detail.zipCode),
            city: detail.city,
            state: detail.state,
            isHomeOwner: detail.homeowner === "yes",
          };
          console.log("Request Data:", requestData);
          const response = await submitApplicationDetails(requestData);
          alert("Application submitted successfully!");
          navigate("/workflow/custom", { state: { canWrite, canRead } });

          console.log("API Response:", response);
        } catch (error) {
          alert("Failed to submit application: " + error.message);
        }
      }
    };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-full">
      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
        {fieldSettings.dob !== false && (
        <div className="flex-1">
          <label htmlFor="dob" className="block mb-1 font-medium">
            Date of Birth 
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            disabled={!canWrite}
            value={detail.dob || ""}
            onChange={handleDetailChange}
            className={`w-full border-b py-2 focus:outline-none ${
              errors.dob ? "border-red-500" : "border-gray-400 focus:border-blue-600"
            }`}
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
        </div>
        )}


        {fieldSettings.monthlyIncome !== false && (
        <div className="flex-1">
          <label htmlFor="monthlyIncome" className="block mb-1 font-medium">
            Monthly Gross Income
          </label>
          <input
            type="text"
            id="monthlyIncome"
            name="monthlyIncome"
            disabled={!canWrite}
            placeholder="Enter amount"
            value={detail.monthlyIncome|| ""}
            onChange={handleDetailChange}
            className={`w-full border-b py-2 focus:outline-none ${
              errors.monthlyIncome ? "border-red-500" : "border-gray-400 focus:border-blue-600"
            }`}
          />
          {errors.monthlyIncome && (
            <p className="text-red-500 text-sm">{errors.monthlyIncome}</p>
          )}
        </div>
        )}
      </div>

      <p className="mb-6 italic text-sm text-gray-700">
        You may include alimony, child support, or separate maintenance income if you wish to have it
        considered.
      </p>

      
      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
        {fieldSettings.ssn !== false && (
        <div className="flex-1">
          <label htmlFor="ssn" className="block mb-1 font-medium">
            SSN
          </label>
          <input
            type="text"
            id="ssn"
            name="ssn"
            disabled={!canWrite}
            placeholder="Social Security Number"
            value={detail.ssn || ""}
            onChange={handleDetailChange}
            className={`w-full border-b py-2 focus:outline-none ${
              errors.ssn ? "border-red-500" : "border-gray-400 focus:border-blue-600"
            }`}
          />
          {errors.ssn && <p className="text-red-500 text-sm">{errors.ssn}</p>}
        
        </div>
        )}
        

        {fieldSettings.confirmSsn !== false && (
        <div className="flex-1">
          <label htmlFor="confirmSsn" className="block mb-1 font-medium">
            Confirm SSN
          </label>
          <input
            type="text"
            id="confirmSsn"
            name="confirmSsn"
            disabled={!canWrite}
            placeholder="Confirm Social Security Number"
            value={detail.confirmSsn|| ""}
            onChange={handleDetailChange}
            className={`w-full border-b py-2 focus:outline-none ${
              errors.confirmSsn ? "border-red-500" : "border-gray-400 focus:border-blue-600"
            }`}
          />
          {errors.confirmSsn && <p className="text-red-500 text-sm">{errors.confirmSsn}</p>}
        </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
        {fieldSettings.amountNeeded !== false && (
        <div className="flex-1">
          <label htmlFor="amountNeeded" className="block mb-1 font-medium">
            How much do you need?
          </label>
          <input
            type="text"
            id="amountNeeded"
            name="amountNeeded"
            disabled={!canWrite}
            placeholder="Amount needed"
            value={detail.amountNeeded|| ""}
            onChange={handleDetailChange}
            className={`w-full border-b py-2 focus:outline-none ${
              errors.amountNeeded ? "border-red-500" : "border-gray-400 focus:border-blue-600"
            }`}
          />
          {errors.amountNeeded && <p className="text-red-500 text-sm">{errors.amountNeeded}</p>}
        </div>
        )}
        
        {fieldSettings.setHomeAddress !== false && (
        <div className="flex-1">
          <label htmlFor="homeAddress" className="block mb-1 font-medium">
            Home Address
          </label>
          <input
            type="text"
            id="homeAddress"
            name="homeAddress"
            disabled={!canWrite}
            placeholder="Street address"
            value={detail.homeAddress || ""}
            onChange={handleDetailChange}
            className={`w-full border-b py-2 focus:outline-none ${
              errors.homeAddress ? "border-red-500" : "border-gray-400 focus:border-blue-600"
            }`}
          />
          {errors.homeAddress && <p className="text-red-500 text-sm">{errors.homeAddress}</p>}
        </div>
        )}
      </div>

     
      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
        {fieldSettings.homeAddress2 !== false && (
        <div className="flex-1">
          <label htmlFor="homeAddress2" className="block mb-1 font-medium">
            Home Address 2
          </label>
          <input
            type="text"
            id="homeAddress2"
            name="homeAddress2"
            disabled={!canWrite}
            placeholder="Apt, suite, etc. (optional)"
            value={detail.homeAddress2 || ""}
              onChange={handleDetailChange}
            className="w-full border-b border-gray-400 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>
        )}
      
      {fieldSettings.zipCode !== false && (
        <div className="flex-1">
          <label htmlFor="zipCode" className="block mb-1 font-medium">
            Zip Code
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            disabled={!canWrite}
            placeholder="Zip code"
            value={detail.zipCode|| ""}
            onChange={handleDetailChange}
            className={`w-full border-b py-2 focus:outline-none ${
              errors.zipCode ? "border-red-500" : "border-gray-400 focus:border-blue-600"
            }`}
          />
          {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode}</p>}
        </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
        {fieldSettings.city !== false && (
        <div className="flex-1">
          <label htmlFor="city" className="block mb-1 font-medium">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            disabled={!canWrite}
            placeholder="City"
            value={detail.city||""}
            onChange={handleDetailChange}
            className={`w-full border-b py-2 focus:outline-none ${
              errors.city ? "border-red-500" : "border-gray-400 focus:border-blue-600"
            }`}
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>
        )}
     
        {fieldSettings.state !== false && (
        <div className="flex-1">
          <label htmlFor="state" className="block mb-1 font-medium">
            State
          </label>
          <select
            id="state"
            name="state"
            value={detail.state}
            disabled={!canWrite}
            onChange={handleDetailChange}
            className={`w-full border-b py-2 focus:outline-none ${
              errors.state ? "border-red-500" : "border-gray-400 focus:border-blue-600"
            }`}
          >
            {states.map((st) => (
              <option key={st} value={st}>
                {st || "Select State"}
              </option>
            ))}
          </select>
          {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
        </div>
        )}
      </div>
       
       {fieldSettings.homeowner !==false && (
      <div className="flex items-center gap-4 mb-6 w-full">
        <h3 className="font-semibold">Are you a homeowner?</h3>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="homeowner"
            value="yes"
            disabled={!canWrite}
            checked={detail.homeowner === "yes"}
            onChange={handleDetailChange}
            className="cursor-pointer accent-blue-600"
          />
          Yes
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="homeowner"
            value="no"
            disabled={!canWrite}
            checked={detail.homeowner === "no"}
            onChange={handleDetailChange}
            className="cursor-pointer accent-blue-600"
          />
          No
        </label>
      </div>
      )}
      {errors.homeowner && <p className="text-red-500 text-sm mb-6">{errors.homeowner}</p>}

     
      <p className="font-bold mb-4 w-full">
        Anti-money laundering and counter-terrorism financing laws require that we collect and verify
        identifying information if you proceed in using Druk PNB Bank Ltd.
      </p>

      {fieldSettings.agreeTerms !== false && (
      <div className="mb-4 w-full">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={detail.agreeTerms}
            onChange={handleDetailChange}
            className={`cursor-pointer accent-blue-600 ${
              errors.agreeTerms ? "border-red-500" : ""
            }`}
          />
          <span>
            By checking the box and submitting my application I agree to Druk PNB Bank Ltd{" "}
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600"
            >
              Terms and Authorization
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600"
            >
              Privacy Policy and Notices
            </a>
          </span>
        </label>
        {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}
      </div>
      )}

      {fieldSettings.authorizeCredit !== false && (
      <div className="mb-6 w-full">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            name="authorizeCredit"
            checked={detail.authorizeCredit}
            onChange={handleDetailChange}
            className={`cursor-pointer accent-blue-600 ${
              errors.authorizeCredit ? "border-red-500" : ""
            }`}
          />
          <span>I authorize credit report pull</span>
        </label>
        {errors.authorizeCredit && <p className="text-red-500 text-sm">{errors.authorizeCredit}</p>}
      </div>
      )}

      <div className="flex justify-between w-full flex-wrap gap-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition flex-grow md:flex-grow-0"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-[#029aaa] text-white px-6 py-2 rounded hover:bg-[#01c4d5] transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ApplicationDetailForm;