<<<<<<< HEAD
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import UserMenu from "./components/AdminPanel/UserMenu";
import Dashboard from "./components/AdminPanel/Dashboard";
import AdminUserForm from "./components/AdminPanel/AdminUserForm";
import LoanSystemConfig from "./components/AdminPanel/LoanSystemConfig";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user_menu" element={<UserMenu />} />
          <Route path="/admin_user_form" element={<AdminUserForm />} />
          <Route path="/loan_system_config" element={<LoanSystemConfig />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    
=======
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Welcome to the LOS</h1>
      <h2>Loan Origination System</h2>
      {/* <div className="mb-6 text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Welcome to the <span style={{color:"#8204FF"}}>LOS</span> </h1>
        <p className="text-gray-600 text-base">Loan Origination System</p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Login to your <span style={{color:"#8204FF"}}>Account</span> </h1>
            <p className="text-gray-600 text-base">See what is going on with your business</p>
      </div> */}
    </div>

>>>>>>> 98149bfc0f3868b1eefbe3379e140f9f93533bc7
  );
}

export default App;
