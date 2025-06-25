import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Auth-related components
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import ResetPassword from "./components/ResetPassword";
import SessionValidator from "./components/SessionValidator";

// Admin and user components
import AdminDashboard from "./components/AdminPanel/AdminDashboard";
import UserDashboard from "./components/AdminPanel/UserDashboard";
import UserMenu from "./components/AdminPanel/UserMenuForm";
import AdminUserForm from "./components/AdminPanel/AdminUserForm";
import LoanSystemConfig from "./components/AdminPanel/LoanSystemConfig";
import UserMenuData from "./components/AdminPanel/UserMenuData";
import AdminUserPanel from "./components/AdminPanel/AdminUserData";
import MenuForm from "./components/AdminPanel/MenuForm";
import AccessControl from "./components/AdminPanel/AccessControl";
import AccessControlSetup from "./components/AdminPanel/AccessControlSetup";
import OrganizationForm from "./components/AdminPanel/OrganizationForm";
import MultiStepForm from "./components/AdminPanel/MultiStepForm";
import FormFieldSettings from "./components/AdminPanel/FormFieldSettings";
import SelectStepsPage from "./components/AdminPanel/SelectStepPage";
import SubmittedApplication from "./components/AdminPanel/SubmittedApplication";
import FormsPage from "./components/AdminPanel/FormsPage";
import LoanTypeSelectionPage from "./components/AdminPanel/LoanTypeSelectionPage";
import FormHeader from "./components/AdminPanel/FormHeader";

import DashboardSidebar from "./components/AdminPanel/DashboardSidebar";
import DashboardHead from "./components/AdminPanel/DashboardHead";

// Default field settings
const defaultFields = [
  "firstName", "lastName", "mobile", "email", "confirmEmail", "dob",
  "monthlyIncome", "ssn", "confirmSsn", "amountNeeded", "homeAddress",
  "homeAddress2", "zipCode", "city", "state", "homeowner", "agreeTerms",
  "authorizeCredit", "applicationId", "loanType", "loanAmount", "term",
  "interestRate", "startDate"
];
const initialSettings = Object.fromEntries(defaultFields.map(key => [key, true]));

function getAdminRoutes(fieldSettings, setFieldSettings) {
  return (
    <>
      <Route path="/dashboard" element={<SessionValidator><AdminDashboard /></SessionValidator>} />

      <Route path="/user_menu" element={<SessionValidator><UserMenu /></SessionValidator>} />
      <Route path="/user" element={<SessionValidator><UserMenuData /></SessionValidator>} />
      
      <Route path="/admin_user_form" element={<SessionValidator><AdminUserForm /></SessionValidator>} />
      <Route path="/roles" element={<SessionValidator><AdminUserPanel /></SessionValidator>} />
      
      <Route path="/access_control/:roleId" element={<SessionValidator><AccessControl /></SessionValidator>} />
      <Route path="/access-control" element={<SessionValidator><AccessControlSetup /></SessionValidator>} />
      
      <Route path="/system-config" element={<SessionValidator><LoanSystemConfig /></SessionValidator>} />
      
      <Route path="/organization" element={<SessionValidator><OrganizationForm /></SessionValidator>} />
      
      {/* Below once are not present */}
      <Route path="/menu_creation" element={<SessionValidator><MenuForm /></SessionValidator>} />
      <Route path="/form_field_settings" element={<SessionValidator><FormFieldSettings fieldSettings={fieldSettings} setFieldSettings={setFieldSettings} /></SessionValidator>} />
      
      
      <Route path="/application-form" element={<SessionValidator><MultiStepForm fieldSettings={fieldSettings} /></SessionValidator>} />
      <Route path="/form_header" element={<SessionValidator><FormHeader /></SessionValidator>} />

      <Route path="/workflow/custom" element={<SessionValidator><LoanTypeSelectionPage /></SessionValidator>} />
      <Route path="/selection_steps_page" element={<SessionValidator><SelectStepsPage /></SessionValidator>} />
      <Route path="/forms_page" element={<SessionValidator><FormsPage /></SessionValidator>} />

      <Route path="/business_rule_management" element={<SessionValidator><div>Business Rule Management</div></SessionValidator>} />
      
    </>
  );
}

function getUserRoutes(fieldSettings) {
  return (
    <>
      <Route path="/dashboard" element={<SessionValidator><UserDashboard /></SessionValidator>} />
      
      <Route path="/submitted_application" element={<SessionValidator><SubmittedApplication /></SessionValidator>} />

      <Route path="/application-form" element={<SessionValidator><MultiStepForm fieldSettings={fieldSettings} /></SessionValidator>} />
      <Route path="/form_header" element={<SessionValidator><FormHeader /></SessionValidator>} />

      <Route path="/workflow/custom" element={<SessionValidator><LoanTypeSelectionPage /></SessionValidator>} />
      <Route path="/selection_steps_page" element={<SessionValidator><SelectStepsPage /></SessionValidator>} />
      <Route path="/forms_page" element={<SessionValidator><FormsPage /></SessionValidator>} />
      
    </>
  );
}

function App() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fieldSettings, setFieldSettings] = useState(initialSettings);

  useEffect(() => {
    const stored = sessionStorage.getItem("role");
    if (stored) {
      setRole(stored.toLowerCase());
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-gray-500">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          toastClassName="custom-toast"
          bodyClassName="text-sm"
        />

        {role ? (
          <div className="lg:flex md:block font-inter" key="authenticated">
            <div className="h-screen hidden lg:block fixed z-20">
              <DashboardSidebar />
            </div>
            <div className="flex-1 lg:ml-80 mt-2">
              <DashboardHead />
              <main className="flex-1">
                <div className="overflow">
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    {role === "admin" && getAdminRoutes(fieldSettings, setFieldSettings)}
                    {role === "user" && getUserRoutes(fieldSettings)}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </div>
              </main>
            </div>
          </div>
        ) : (
          <Routes  key="authenticated">
            <Route path="/" element={<Login onLogin={(r) => setRole(r)} />} />
            <Route path="/login" element={<Login onLogin={(r) => setRole(r)} />} />
            <Route path="/create_account" element={<CreateAccount />} />
            <Route path="/reset_password" element={<ResetPassword />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
