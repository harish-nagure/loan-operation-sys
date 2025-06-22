import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAccountApi } from "./api_service";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.firstname.trim()) newErrors.firstname = "First name is required";
    if (!form.lastname.trim()) newErrors.lastname = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.phonenumber.trim()) newErrors.phonenumber = "Phone number is required";

    if (!form.password) newErrors.password = "Password is required";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Creating account:", form);

try {
      const UserDetails = {
        email: form.email,
        firstName: form.firstname,
        lastName: form.lastname,
        password: form.password,
        roleId: "1", 
        phone: form.phonenumber,
      };

      console.log(UserDetails);

      const result = await createAccountApi(UserDetails);
      console.log("Account created:", result);
      alert("Account created successfully! with User ID: "+result.data.userId);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to create account: " + error.message);
    } 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#30c9d6] p-4">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden w-full max-w-4xl">

        {/* <div className="w-full md:w-1/2 bg-[#029aaa] flex flex-col items-center justify-center py-12 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Join WSLOS</h1>
          <img
            src="https://acemoney.in/assets/images/fintech/neo%20bank-01.png"
            alt="Register"
            className="w-full max-w-xs rotate-2"
          />
        </div> */}
         <div className="w-full md:w-1/2 bg-[#029aaa] flex flex-col items-center justify-center py-12 px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Join WSLOS</h1>
            
            {/* Hide image on small screens, show from md (768px) onwards */}
            <img
            src="https://acemoney.in/assets/images/fintech/neo%20bank-01.png"
            alt="Register"
            className="w-full max-w-xs rotate-2 hidden md:block"
            />
        </div>  

        {/* Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#01c4d5] mb-8 text-center md:text-left">
            Create Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={form.firstname}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#029aaa] ${
                  errors.firstname ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.firstname && <p className="text-red-500 text-xs">{errors.firstname}</p>}
            </div>

            <div>
              <input
                type="text"
                name="lastname" 
                placeholder="Last Name"
                value={form.lastname}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#029aaa] ${
                  errors.lastname ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.lastname && <p className="text-red-500 text-xs">{errors.lastname}</p>}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email ID"
                value={form.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#029aaa] ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            {/* Phone Number */}
            <div>
              <input
                type="text" 
                name="phonenumber"
                placeholder="Phone Number"
                value={form.phonenumber}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#029aaa] ${
                  errors.phonenumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phonenumber && <p className="text-red-500 text-xs">{errors.phonenumber}</p>}
            </div>
            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Set Password"
                value={form.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#029aaa] ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#029aaa] ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#029aaa] text-white py-2 rounded hover:bg-[#01c4d5] transition"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
