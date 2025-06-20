import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import { SiSimplelogin } from "react-icons/si";
import { SendOTP, VerifyOTP } from './api_service';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [OTP, setOTP] = useState('');
  const [email, setEmail] = useState('');
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  // OTP Timer
  useEffect(() => {
    if (isSending && timer > 0) {
      const countdown = setTimeout(() => setTimer(t => t - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setIsSending(false);
    }
  }, [timer, isSending]);

  const handleSendOTP = async () => {
    setLoading(true);
    try {
      const data_json = await SendOTP({ username, password });
      console.log("Send OTP response data:", data_json);
      const data = data_json?.data;

      if (data) {
        setLoading(false);
        alert(data_json.message +" "+ data.email);
        console.log("OTP sent successfully:", data.email);
        setEmail(data.email);

        setIsSending(true);
        setTimer(20);
        setIsOTPVerified(false);
        return;
      } 
     
    } catch (err) {
      setErrors({ username:'Invalid credentials', password:'Invalid credentials', OTP: 'Failed to send OTP. Check credentials.' });
    }
     finally {
      setLoading(false);
     }
  };


  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // const newErrors = validateForm();
    const newErrors = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    if (errors.username === 'Invalid credentials' || errors.password === 'Invalid credentials') {
      newErrors.username = 'Invalid credentials';
      newErrors.password = 'Invalid credentials';
    }
    if (!OTP.trim()) newErrors.OTP = 'OTP is required';

    if (OTP.length !== 6) newErrors.OTP = 'OTP must be 6 digits';

    if (newErrors) setLoading(false);
    setErrors(newErrors);


    if (Object.keys(newErrors).length === 0) {
      try {

        console.log('Verifying OTP for user:', { email, otp: OTP });

        const data = await VerifyOTP({ email, otp: OTP });
        
        console.log('Login successful:', { username, role: data?.role });
        
        onLogin(data?.role?.toLowerCase());
        const isAdmin = data?.role?.toLowerCase() === 'admin';
        
        navigate(isAdmin ? '/user_menu_data' : '/application_form');
      } catch (err) {

        console.error("Login error:", err.message);
        onLogin(null);
        setErrors({  OTP: 'Invalid OTP' });
      }finally {
      setLoading(false);
    }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#30c9d6]">

      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-white border-t-[#029aaa] rounded-full animate-spin"></div>
        </div>
      )}

      {/* <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden w-full max-w-4xl"> */}
      <div className={`bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden w-full max-w-4xl ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
       
        <div className="w-full md:w-1/2 bg-[#029aaa] flex flex-col items-center justify-center py-12 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Join WSLOS</h1>
          <img
            src="https://acemoney.in/assets/images/fintech/neo%20bank-01.png"
            alt="Register"
            className="w-full max-w-xs rotate-2 hidden md:block"
          />
        </div>

        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-[#01c4d5] mb-6 flex w-full items-center justify-center">
            <SiSimplelogin /> Login
          </h2>

          <form onSubmit={handleSubmit} autoComplete="on" className="space-y-5">
            {/* Username */}
            <div>
              <label className="block mb-1 text-gray-700">Username/Email</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                autoFocus
                placeholder="Enter your username"
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#029aaa] ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block mb-1 text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Enter your password"
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#029aaa] ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              <span
                className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* <div onClick={() => navigate('/reset_password')}>Forgot password</div> */}

            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center text-sm text-gray-700">
              </label>

              <p className="text-sm text-[#029aaa] hover:underline cursor-pointer" onClick={() => navigate('/reset_password')}>
                Forgot password?
              </p>
            </div>


            {/* OTP */}
            <div>
              <label className="block mb-1 text-gray-700">OTP</label>
              <div className="flex items-center">
                <div className={`flex items-center border rounded px-3 py-2 w-full focus-within:ring-2 ${isOTPVerified ? 'border-green-500 ring-green-300' : 'focus-within:ring-[#029aaa]'}`}>
                  <input
                    type="text"
                    value={OTP}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*$/.test(val)) setOTP(val);
                      setIsOTPVerified(false);
                    }}
                    maxLength={6}
                    placeholder="Enter OTP"
                    className="flex-1 focus:outline-none"
                  />
                  {isOTPVerified ? (
                    <FaCheckCircle className="text-green-500 ml-2" />
                  ) : (
                    <span
                      onClick={handleSendOTP}
                      className={`ml-2 text-sm cursor-pointer ${timer > 0 ? 'text-gray-400 pointer-events-none' : 'text-[#029aaa] hover:underline'}`}
                    >
                      {isSending ? `Resend in ${timer}s` : 'Send OTP'}
                     
                    </span> 
                    
                  )}
                </div>
                {/* <button
                  type="button"
                  onClick={handleVerifyOTP}
                  disabled={OTP.length !== 6}
                  className={`ml-2 px-3 py-1 text-sm text-white rounded ${OTP.length !== 6 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#029aaa] hover:bg-[#027c8a]'}`}
                >
                  Verify
                </button> */}
              </div>
              {errors.OTP && <p className="text-red-500 text-xs mt-1">{errors.OTP}</p>}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#029aaa] text-white py-2 rounded hover:bg-[#01c4d5] transition"
            >
              Login
            </button>

            {/* Create Account */}
            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{' '}
              <a href="/create_account" className="text-[#029aaa] hover:underline">Create Account</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
