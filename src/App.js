import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
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

// Dashboard
import AdminDashboard from "./components/AdminPanel/AdminDashboard";
import UserDashboard from "./components/AdminPanel/UserDashboard";

//Pages
import UserMenuData from "./components/AdminPanel/UserMenuData";


import AdminUserPanel from "./components/AdminPanel/AdminUserData";

import AccessControlSetup from "./components/AdminPanel/AccessControlSetup";
import AccessControl from "./components/AdminPanel/AccessControl";

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

// Map paths to their respective components

// const routeComponentMap = {
//   "/dashboard": roleId === 1 ? <AdminDashboard /> : <UserMenuData/>,
//   "/user": <UserMenuData />,
//   "/roles": <AdminUserPanel />,
//   "/access-control": <AccessControlSetup />,
//   "/organization": <OrganizationForm />,
//   "/system-config": <LoanSystemConfig />,
//   "/application-form": <MultiStepForm />,
//   "/cr": <FormHeader />,
//   "/workflow/custom": <LoanTypeSelectionPage />,
//   "/selection_steps_page": <SelectStepsPage />,
//   "/forms_page": <FormsPage />,
//   "/submitted_application": <SubmittedApplication />,
//   "/form_field_settings": <FormFieldSettings />
// };

// Protected route wrapper based on menu permissions
function createProtectedRoute({ path, element, menus, fieldSettings, setFieldSettings }) {
  const allMenus = [...menus, ...menus.flatMap(m => m.subMenus || [])];
  const matched = allMenus.find(menu => menu.url === path);

  // if (matched?.canRead || matched?.canAll) {
  if (true) {
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

  // Fallback route if no permission
  return (
    <Route
      key={path}
      path={path}
      element={
        <SessionValidator>
        <Navigate to="/dashboard" replace />
        </SessionValidator>
      }
    />
  );
}

// Main application logic
function AppWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem("token"));
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fieldSettings, setFieldSettings] = useState(initialSettings);
  const navigate = useNavigate(); // For optional redirect

  // Load menu permissions based on roleId
  const roleId = sessionStorage.getItem("roleId");
  // alert(roleId)
  const routeComponentMap = {
  "/dashboard": roleId == 1 ? <AdminDashboard /> : <UserDashboard/>,
  "/user": <UserMenuData />,
  "/roles": <AdminUserPanel />,
  "/access-control": <AccessControlSetup />,

  "/access_control/:roleId": <AccessControl />,
  
  "/organization": <OrganizationForm />,

  "/system-config": <LoanSystemConfig />,

  "/application-form": <MultiStepForm />,

  "/corporate_form": <FormHeader />,
  
  "/workflow/custom": <LoanTypeSelectionPage />,

  "/selection_setup": <SelectStepsPage />,

  "/forms_steps": <FormsPage />,

  "/submitted_application": <SubmittedApplication />,
  
  "/form_field_settings": <FormFieldSettings />
  };


  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     setLoading(false);
  //     return;
  //   }

  //   const roleId = sessionStorage.getItem("roleId");
  //   if (!roleId) {
  //     setMenus([]);
  //     setLoading(false);
  //     return;
  //   }

  //   getMenusWithPermissions(roleId)
  //     .then(setMenus)
  //     .catch(err => {
  //       console.error("Error loading menus:", err);
  //       setMenus([]);
  //     })
  //     .finally(() => setLoading(false));
  // }, [isAuthenticated]);

  useEffect(() => {
  const fetchMenus = async () => {
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

    try {
      const result = await getMenusWithPermissions(roleId);
      setMenus(result);
    } catch (error) {
      console.error("❌ Error fetching menus:", error);
      setMenus([]);
    } finally {
      setLoading(false);
    }
  };

  fetchMenus();
}, [isAuthenticated]);


  // Called after OTP or login success
  function handleLoginSuccess(data) {
    if (!data?.token || !data?.roleId) {
      console.error("Login failed: Missing token or roleId", data);
      return;
    }

    // sessionStorage.setItem("token", data.token);
    // sessionStorage.setItem("roleId", data.roleId);
    // sessionStorage.setItem("username", data.username || "");
    // sessionStorage.setItem("refreshToken", data.refreshToken || "");
    // sessionStorage.setItem("isLoggedIn", "true");
    // sessionStorage.setItem("loginTime", Date.now().toString());

    setIsAuthenticated(true);
    navigate("/dashboard"); // Redirect user after login
  }

  if (loading) {
    return (
    <div className="absolute inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-white border-t-[#029aaa] rounded-full animate-spin"></div>
    </div>
    );
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
            <main>
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

// Export app with routing
export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
