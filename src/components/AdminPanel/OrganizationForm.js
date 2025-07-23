import React, { useState } from "react";


import DashboardSidebar from "./DashboardSidebar";
import DashboardHead from "./DashboardHead";
import { useLocation } from "react-router-dom";

const OrganizationForm = ({canRead = false, canWrite = false}) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone:"",
    email:"",
    webURL:"",
    companyNo: "",
  
  taxNo: "",
  panNo: "",
  tanNo: "",
    logo: null,
    logoPreview: null,
  });

  const handleChange = (e) => {
    
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        logo: file,
        logoPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e) => {
    if(!canWrite){
      alert("You don't have permission to edit users.");
      return;
    }
    e.preventDefault();

    // You can handle form submission logic here (e.g., send to API)
    console.log("Form submitted:", formData);

    alert("Organization details submitted successfully!");
  };

  return (


    //  <div className="lg:flex md:block font-inter">
    //   <div className="h-screen hidden lg:block fixed z-20">
    //     <DashboardSidebar />
    //   </div>
    //   <main className="flex-1 lg:ml-72">
    //     <DashboardHead />

    <div className="flex items-center justify-center bg-gray-100 pr-8 py-12 pt-6">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-6xl w-full">
        <h2 className="text-2xl font-semibold mb-6 text-accent">🏢 Organization Details</h2>
        
      <form onSubmit={handleSubmit} className="space-y-6">
  {/* Row 1: Organization Name + Website URL */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Organization Name:</label>
      <input
        id="name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        disabled={!canWrite}
        placeholder="e.g., Infinity Corp"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
      />
    </div>

    <div>
      <label htmlFor="webURL" className="block mb-1 font-medium text-gray-700">Website URL:</label>
      <input
        id="webURL"
        type="url"
        name="webURL"
        value={formData.webURL}
        onChange={handleChange}
        disabled={!canWrite}
        placeholder="e.g., https://www.company.com"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
      />
    </div>
  </div>

  {/* Row 2: Phone + Email */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label htmlFor="phone" className="block mb-1 font-medium text-gray-700">Phone:</label>
      <input
        id="phone"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        disabled={!canWrite}
        placeholder="e.g., +91 9876543210"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
      />
    </div>

    <div>
      <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email:</label>
      <input
        id="email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        disabled={!canWrite}
        placeholder="e.g., contact@company.com"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
      />
    </div>
  </div>


  {/* Row 3: Company No + Register No */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label htmlFor="companyNo" className="block mb-1 font-medium text-gray-700">Company Registeration Number:</label>
    <input
      id="companyNo"
      type="text"
      name="companyNo"
      value={formData.companyNo}
      onChange={handleChange}
      required
      disabled={!canWrite}
      placeholder="e.g., C123456"
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
    />
  </div>

  <div>
    <label htmlFor="taxNo" className="block mb-1 font-medium text-gray-700">Tax Number:</label>
    <input
      id="taxNo"
      type="text"
      name="taxNo"
      value={formData.taxNo}
      onChange={handleChange}
      required
      disabled={!canWrite}
      placeholder="e.g., T123456789"
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
    />
  </div>

 
</div>

{/* Row 4: Tax No + PAN No */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  

  <div>
    <label htmlFor="panNo" className="block mb-1 font-medium text-gray-700">PAN Number:</label>
    <input
      id="panNo"
      type="text"
      name="panNo"
      value={formData.panNo}
      onChange={handleChange}
      required
      disabled={!canWrite}
      pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
      title="Enter valid PAN (e.g., ABCDE1234F)"
      placeholder="e.g., ABCDE1234F"
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
    />
  </div>

   <div>
    <label htmlFor="tanNo" className="block mb-1 font-medium text-gray-700">TAN Number:</label>
    <input
      id="tanNo"
      type="text"
      name="tanNo"
      value={formData.tanNo}
      onChange={handleChange}
      required
      disabled={!canWrite}
      pattern="[A-Z]{4}[0-9]{5}[A-Z]{1}"
      title="Enter valid TAN (e.g., ABCD12345E)"
      placeholder="e.g., ABCD12345E"
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
    />
  </div>
</div>

{/* Row 5: TAN No */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 
</div>


  {/* Row 3: Address + Logo */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label htmlFor="address" className="block mb-1 font-medium text-gray-700">Address:</label>
      <textarea
        id="address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
        disabled={!canWrite}
        placeholder="Street, City, ZIP"
        className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent"
        rows="3"
      />
    </div>

    <div>
      <label htmlFor="logo" className="block mb-1 font-medium text-gray-700">Upload Logo:</label>
      <input
        id="logo"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={!canWrite}
        className="w-full text-gray-600"
      />

      {formData.logoPreview && (
        <div className="mt-3">
          <p className="text-gray-600 mb-1">Logo Preview:</p>
          <img src={formData.logoPreview} alt="Logo Preview" className="h-20 rounded border" />
        </div>
      )}
    </div>
  </div>

  {/* Submit Button */}
  <div className="flex justify-center">
  <button
    type="submit"
    className="w-60 bg-accent text-white py-2 px-4 rounded-lg hover:bg-secondary transition"
  >
    ✅ Save Organization
  </button>
  </div>
</form>

      </div>
    </div>
        // </main> 
        // </div>
  );
};

export default OrganizationForm;
