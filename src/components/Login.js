import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SiSimplelogin } from "react-icons/si";

import { loginUser } from './api_service';

const LoginPage = ({onLogin}) => {
  // const [OTP, setOTP] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


   const [OTP, setOTP] = useState('');
  const [timer, setTimer] = useState(0);
  const [isSending, setIsSending] = useState(false);

  const handleSendOTP = () => {
    // Simulate OTP send API call
    console.log('OTP sent');

    setIsSending(true);
    setTimer(20); // 20 seconds countdown
  };

  useEffect(() => {
    let interval = null;

    if (isSending && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setIsSending(false);
    }

    return () => clearInterval(interval);
  }, [isSending, timer]);

 
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const newErrors = {};
  //   if (!username.trim()) newErrors.username = 'Username is required';
  //   if (!password.trim()) newErrors.password = 'Password is required';

  //   setErrors(newErrors);

  //   if (Object.keys(newErrors).length === 0) {
  //     console.log('Form submitted:', { userType, username, password });
      
  //   }
  //   navigate('/user_menu_data'); // Redirect to dashboard after successful login
    
  // };
const handleVerifyOTP = () => {
  const newErrors = {};
  if (!OTP.trim()) newErrors.OTP = 'OTP is required';
  else if (OTP.length !== 6) newErrors.OTP = 'OTP must be 6 digits';
  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    // Call your verify OTP API here
    console.log('Verifying OTP:', OTP);
  }

};
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!OTP.trim()) {
      newErrors.OTP = 'OTP is required';
    } else if (OTP.length !== 6) {
      newErrors.OTP = 'OTP must be 6 digits';
    } 
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!password.trim()) newErrors.password = 'Password is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const data = await loginUser({ username, password });


        console.log('Login successful:', { OTP, username});
        onLogin(data?.role?.toLowerCase());
        navigate('/user_menu_data');
      } catch (error) {
        console.log('Login failed: ' + error.message);
        onLogin(null);
        setErrors({ password: 'Invalid credentials' , username: 'Invalid credentials' });
      }
    }
  };
  //const handleSubmit = (e) => {
  //  e.preventDefault();

   // const newErrors = {};
 //   if (!username.trim()) newErrors.username = 'Username is required';
//    if (!password.trim()) newErrors.password = 'Password is required';
//    setErrors(newErrors);
//
  //if (Object.keys(newErrors).length === 0) {
      // Dummy user list
    //  const dummyUsers = [
    //    { username: 'admin', password: 'admin123', type: 'Admin' },
 //       { username: 'user', password: 'user123', type: 'User' }/
  //];

  //    const matchedUser = dummyUsers.find(
  //      (user) =>
  //        user.username === username &&
 //         user.password === password &&
 //         user.type === userType
  //    );

 //     if (matchedUser) {
        // Save session data
  //      sessionStorage.setItem('isLoggedIn', 'true');
//        sessionStorage.setItem('username', matchedUser.username);
  //      sessionStorage.setItem('userType', matchedUser.type);

    //    console.log('Login successful:', matchedUser);
    //    navigate('/user_menu_data');
   //   } else {
   //     setErrors({ password: 'Invalid credentials or user type' });
  //    }
//    }
//  };

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   const newErrors = {};
//   if (!username.trim()) newErrors.username = 'Username is required';
//   if (!password.trim()) newErrors.password = 'Password is required';

//   setErrors(newErrors);

//   if (Object.keys(newErrors).length === 0) {
//     try {
//       const response = await fetch('', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password, userType }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         console.log('Login successful:', data);
//         // store token/user info if needed
//         localStorage.setItem('token', data.token);
//         navigate('/user_menu_data');
//       } else {
//         setErrors({ password: data.message || 'Invalid credentials' });
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setErrors({ password: 'Something went wrong. Try again later.' });
//     }
//   }
// };


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#30c9d6]">


       <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden w-full max-w-4xl">
        
         <div className="w-full md:w-1/2 bg-[#029aaa] flex flex-col items-center justify-center py-12 px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Join WSLOS</h1>
            
            {/* Hide image on small screens, show from md (768px) onwards */}
            <img
            src="https://acemoney.in/assets/images/fintech/neo%20bank-01.png"
            alt="Register"
            className="w-full max-w-xs rotate-2 hidden md:block"
            />
        </div> 
        

        {/* Right side form */}
        <div className="w-full md:w-1/2 p-10">
        <h2 className="text-3xl font-bold text-[#01c4d5] mb-6 flex items-center gap-2">
          <SiSimplelogin />
          Login
        </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            
            {/* Username */}
            <div>
              <label className="block mb-1 text-gray-700">Username/Email</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#029aaa] ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>

            {/* Password */}
            <div className='relative'>
              <label className="block mb-1 text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#029aaa] ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              <span
                className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Remember & Forgot */}
            <div className="flex justify-between text-sm text-gray-600">
              <label>
                <input type="checkbox" className="mr-1" />
                Remember me
              </label>
              <a href="/reset_password" className="text-[#029aaa] hover:underline">Forgot password?</a>
            </div>


            {/* User Type */}
            {/* <div>
              <label className="block mb-1 text-gray-700">OTP</label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  value={OTP}
                  onChange={(e) => setOTP(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#029aaa]"
                  placeholder="Enter OTP"
                />
                <button
                  onClick={handleSendOTP}
                  disabled={isSending}
                  className={`px-4 w-1/4 py-0.5 text-sm rounded text-white ${
                    isSending ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#029aaa] hover:bg-[#027c8a]'
                  }`}
                >
                  {isSending ? `Resend in ${timer}s` : 'Send OTP'}
                </button>
              </div>

              {errors.OTP && <p className="text-red-500 text-xs mt-1">{errors.OTP}</p>}
            </div> */}
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">OTP</label>
              <div className="flex items-center gap-2">
                {/* OTP Input */}
                <div className="flex items-center border rounded px-3 py-2 focus-within:ring-2 focus-within:ring-[#029aaa] w-full max-w-xs">
                  <input
                    type="text"
                    value={OTP}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*$/.test(val)) setOTP(val); // only digits
                    }}
                    maxLength={6}
                    placeholder="Enter OTP"
                    className="flex-1 focus:outline-none"
                  />
                  <span
                    onClick={handleSendOTP}
                    className={`ml-2 text-sm cursor-pointer ${
                      timer > 0 ? 'text-gray-400 pointer-events-none' : 'text-[#029aaa] hover:underline'
                    }`}
                  >
                    {isSending ? (timer > 0 ? `Resend in ${timer}s` : 'Resend') : 'Send OTP'}
                  </span>
                </div>

                {/* Verify OTP Button */}
                <button
                  onClick={handleVerifyOTP}
                  disabled={OTP.length !== 6}
                  className={`px-4 w-1/5 text-sm rounded text-white ${
                    OTP.length !== 6 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#029aaa] hover:bg-[#027c8a]'
                  }`}
                >
                  Verify OTP
                </button>
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
