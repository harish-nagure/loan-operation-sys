import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



import UserMenu from "./components/AdminPanel/UserMenuForm";
import Dashboard from "./components/AdminPanel/Dashboard";
import AdminUserForm from "./components/AdminPanel/AdminUserForm";
import LoanSystemConfig from "./components/AdminPanel/LoanSystemConfig";
import UserMenuData from "./components/AdminPanel/UserMenuData";

import Login from "./components/Login";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className=" bg-gray-100 min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user_menu" element={<UserMenu />} />
          <Route path="/admin_user_form" element={<AdminUserForm />} />
          <Route path="/loan_system_config" element={<LoanSystemConfig />} />
          <Route path="/user_menu_data" element={<UserMenuData />} />
          <Route path="/login" element={<Login />} />

          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
