import React, { useState } from "react";

const CreateAccount = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Creating account:", form);
      // Call API here
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
                name="username"
                placeholder="Username"
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#029aaa] ${
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email ID"
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#029aaa] ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Set Password"
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
