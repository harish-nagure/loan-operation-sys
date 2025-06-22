import React, { useState } from "react";
import { forgetPassword,resetPassword } from "./api_service";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
    // confirmnewPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange =  (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // const handleRequestOTP = async (e) => {

  //   e.preventDefault();
  //   if (!form.email.trim()) {
  //     setErrors({ email: "email is required" });
  //     return;
  //   }


  //   // setErrors({})
    
  //   const data = await forgetPassword( {userId : form.email.trim()});
  //   alert("ddjfhks"+data);
  //   console.log("Requesting OTP for:", data);

  //   setStep(2);
  // };

  const handleRequestOTP = async (e) => {
  e.preventDefault();

  if (!form.email.trim()) {
    setErrors({ email: "Email is required" });
    return;
  }

  try {
    const userID = {
      userId : form.email.trim(),
    };
    const data = await forgetPassword(userID);
    alert(data.message);
    console.log("Requesting OTP for:", data);
    setStep(2);
  } catch (error) {
    alert("Failed to request OTP: " + error.message);
    console.error("OTP request error:", error);
    setErrors({email: error.message})
  }
};

  const handleReset = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.otp.trim()) newErrors.otp = "OTP is required";
    if (!form.newPassword) newErrors.newPassword = "Password is required";
    if (form.newPassword !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Resetting newPassword for:", form.email);
      try{
        const resetData = {
          email: form.email || "",
          otp: form.otp || "",
          newPassword: form.newPassword || "",
        }
        const data = await resetPassword(resetData);
        alert(data.message);
        navigate("/login");
      }catch(error){
        alert("Failed to request OTP: " + error.message);
        console.error("OTP request error:", error);
        setErrors({otp:error.message})
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#30c9d6] px-4">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-w-5xl w-full">
        <div className="w-full md:w-1/2 bg-[#029aaa] flex flex-col items-center justify-center py-10 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Reset Your Password
          </h1>
          <img
            src="https://acemoney.in/assets/images/fintech/neo%20bank-01.png"
            alt="Reset"
            className="w-full max-w-xs rotate-2 hidden md:block"
          />
        </div>

        <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-8 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#01c4d5] mb-6">
            Forgot Password
          </h2>
          <form
            onSubmit={step === 1 ? handleRequestOTP : handleReset}
            className="space-y-4"
          >
            {step === 1 ? (
              <>
                <input
                  type="email"
                  name="email"
                  autoFocus
                  placeholder="Enter Email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#029aaa] ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </>
            ) : (
              <>
                <input
                  type="text"
                  name="otp"
                  value={form.otp}
                  placeholder="Enter OTP"
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#029aaa] ${
                    errors.otp ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.otp && (
                  <p className="text-red-500 text-xs">{errors.otp}</p>
                )}

                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={form.newPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#029aaa] ${
                    errors.newPassword ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-xs">{errors.newPassword}</p>
                )}

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
              </>
            )}

            <button
              type="submit"
              className="w-full bg-[#029aaa] text-white py-2 rounded hover:bg-[#01c4d5] transition"
            >
              {step === 1 ? "Send OTP" : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
