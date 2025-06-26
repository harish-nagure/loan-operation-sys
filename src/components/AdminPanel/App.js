import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Auth
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import ResetPassword from "./components/ResetPassword";
import SessionValidator from "./components/SessionValidator";

// Layout
import DashboardSidebar from "./components/AdminPanel/DashboardSidebar";
import DashboardHead from "./components/AdminPanel/DashboardHead";

// Pages
import AdminDashboard from "./components/AdminPanel/AdminDashboard";

import UserMenuData from "./components/AdminPanel/UserMenuData";
import AdminUserPanel from "./components/AdminPanel/AdminUserData";
import AccessControlSetup from "./components/AdminPanel/AccessControlSetup";
import OrganizationForm from "./components/AdminPanel/OrganizationForm";
import LoanSystemConfig from "./components/AdminPanel/LoanSystemConfig";
import MultiStepForm from "./components/AdminPanel/MultiStepForm";
import LoanTypeSelectionPage from "./components/AdminPanel/LoanTypeSelectionPage";
import SelectStepsPage from "./components/AdminPanel/SelectStepPage";
import FormsPage from "./components/AdminPanel/FormsPage";
import SubmittedApplication from "./components/AdminPanel/SubmittedApplication";
import FormFieldSettings from "./components/AdminPanel/FormFieldSettings";
import FormHeader from "./components/AdminPanel/FormHeader";

import { getMenusWithPermissions } from "./components/api_service";

// Field config
const fieldKeys = [
  "firstName", "lastName", "mobile", "email", "confirmEmail", "dob",
  "monthlyIncome", "ssn", "confirmSsn", "amountNeeded", "homeAddress",
  "homeAddress2", "zipCode", "city", "state", "homeowner", "agreeTerms",
  "authorizeCredit", "applicationId", "loanType", "loanAmount", "term",
  "interestRate", "startDate"
];
const initialSettings = Object.fromEntries(fieldKeys.map(key => [key, true]));

// Route map
const routeComponentMap = {
  "/dashboard": <AdminDashboard />,

  "/user": <UserMenuData />,
  
  "/roles": <AdminUserPanel />,
  
  "/access-control": <AccessControlSetup />,
  
  "/organization": <OrganizationForm />,
  "/system-config": <LoanSystemConfig />,
  
  "/application-form": <MultiStepForm />,
  "/form_header": <FormHeader />,
  "/workflow/custom": <LoanTypeSelectionPage />,
  "/selection_steps_page": <SelectStepsPage />,
  "/forms_steps": <FormsPage />,
  "/submitted_application": <SubmittedApplication />,
  "/form_field_settings": <FormFieldSettings />
};

// This is now a **function**, not a component
function createProtectedRoute({ path, element, menus, fieldSettings, setFieldSettings }) {
  const allMenus = [...menus, ...menus.flatMap(m => m.subMenus || [])];
  const matched = allMenus.find(menu => menu.url === path);

  if (matched?.canRead || matched?.canAll) {
    return (
      <Route
        key={path}
        path={path}
        element={
          <SessionValidator>
            {React.cloneElement(element, { fieldSettings, setFieldSettings })}
          </SessionValidator>
        }
      />
    );
  }

  return (
    <Route
      key={path}
      path={path}
      element={
        <SessionValidator>
        <AdminDashboard />
        </SessionValidator>
      }
    />
  );
}

function AppWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem("token"));
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fieldSettings, setFieldSettings] = useState(initialSettings);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    const roleId = sessionStorage.getItem("roleId");
    if (!roleId) {
      setMenus([]);
      setLoading(false);
      return;
    }

    getMenusWithPermissions(roleId)
      .then(setMenus)
      .catch(err => {
        console.error("Error loading menus:", err);
        setMenus([]);
      })
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  function handleLoginSuccess(data) {
    if (!data?.token || !data?.roleId) {
      console.error("Login failed: Missing token or roleId", data);
      return;
    }

    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("roleId", data.roleId);
    setIsAuthenticated(true);
  }

  if (loading) {
    return <div className="text-center mt-20 text-gray-500">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      {isAuthenticated ? (
        <div className="lg:flex md:block font-inter">
          <div className="h-screen hidden lg:block fixed z-20">
            <DashboardSidebar permissions={menus} />
          </div>
          <div className="flex-1 lg:ml-80 mt-2">
            <DashboardHead />
            <main className="overflow">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                {Object.entries(routeComponentMap).map(([path, component]) =>
                  createProtectedRoute({
                    path,
                    element: component,
                    menus,
                    fieldSettings,
                    setFieldSettings
                  })
                )}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Login onLogin={handleLoginSuccess} />} />
          <Route path="/login" element={<Login onLogin={handleLoginSuccess} />} />
          <Route path="/create_account" element={<CreateAccount />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
