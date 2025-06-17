import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



import UserMenu from "./components/AdminPanel/UserMenuForm";
import Dashboard from "./components/AdminPanel/Dashboard";
import AdminUserForm from "./components/AdminPanel/AdminUserForm";
import LoanSystemConfig from "./components/AdminPanel/LoanSystemConfig";
import UserMenuData from "./components/AdminPanel/UserMenuData";
import AdminUserPanel from "./components/AdminPanel/AdminUserData";

import Login from "./components/Login";
import MenuForm from "./components/AdminPanel/MenuForm";
import AccessControlSetup from "./components/AdminPanel/AccessControlSetup";
import AccessControl from "./components/AdminPanel/AccessControl";
import OrganizationForm from "./components/AdminPanel/OrganizationForm";
import MultiStepForm from "./components/AdminPanel/MultiStepForm";
import FormFieldSettings from "./components/AdminPanel/FormFieldSettings";

import SelectStepsPage from "./components/AdminPanel/SelectStepPage";
import CreateAccount from "./components/CreateAccount";
import ResetPassword from "./components/ResetPassword";


import SessionValidator from "./components/SessionValidator";
import FormsPage from "./components/AdminPanel/FormsPage";
import LoanTypeSelectionPage from "./components/AdminPanel/LoanTypeSelectionPage";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const defaultFields = [
  "firstName", "lastName", "mobile", "email", "confirmEmail",
  "dob", "monthlyIncome", "ssn", "confirmSsn", "amountNeeded",
  "homeAddress", "homeAddress2", "zipCode", "city", "state",
  "homeowner", "agreeTerms", "authorizeCredit", "applicationId",
  "loanType", "loanAmount", "term", "interestRate", "startDate"
];

const initialSettings = Object.fromEntries(defaultFields.map(key => [key, true]));

function App() {

    const [fieldSettings, setFieldSettings] = useState(initialSettings);


  return (
    <div className=" bg-gray-100 min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/create_account"
            element={<CreateAccount />}
          />
          <Route
            path="/reset_password"  
            element={<ResetPassword />}
          />

          {/* <Route path="/user_menu" element={<UserMenu />} />
          <Route path="/admin_user_form" element={<AdminUserForm />} />
          <Route path="/loan_system_config" element={<LoanSystemConfig />} />
          <Route path="/user_menu_data" element={<UserMenuData />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin_user_data" element={<AdminUserPanel />} />
          <Route path="/menu_creation" element={<MenuForm />} />
          <Route path="/access_control" element={<AccessControl />} />
        
          <Route path="/organization_form" element={<OrganizationForm />} />
          <Route path="/application_form" element={<MultiStepForm />} /> */}

          <Route
            path="/user_menu"
            element={
              <SessionValidator>
                <UserMenu />
              </SessionValidator>
            }
          />
          <Route
            path="/admin_user_form"
            element={
              <SessionValidator>
                <AdminUserForm />
              </SessionValidator>
            }
          />
          <Route
            path="/loan_system_config"
            element={
              <SessionValidator>
                <LoanSystemConfig />
              </SessionValidator>
            }
          />
          <Route
            path="/user_menu_data"
            element={
              <SessionValidator>
                <UserMenuData />
              </SessionValidator>
            }
          />
          <Route
            path="/dashboard"
            element={
              <SessionValidator>
                <Dashboard />
              </SessionValidator>
            }
          />
          <Route
            path="/admin_user_data"
            element={
              <SessionValidator>
                <AdminUserPanel />
              </SessionValidator>
            }
          />
          <Route
            path="/menu_creation"
            element={
              <SessionValidator>
                <MenuForm />
              </SessionValidator>
            }
          />
          <Route
            path="/access_control_setup"
            element={
              <SessionValidator>
                <AccessControlSetup />
              </SessionValidator>
            }
          />

           <Route
            path="/access_control"
            element={
              <SessionValidator>
                <AccessControl />
              </SessionValidator>
            }
          />
          <Route
            path="/organization_form"
            element={
              <SessionValidator>
                <OrganizationForm />
              </SessionValidator>
            }
          />
          <Route
            path="/application_form"
            element={
              <SessionValidator>
                <MultiStepForm fieldSettings={fieldSettings}/>
              </SessionValidator>
            }
          />
          <Route
            path="/form_field_settings"
            element={
              <SessionValidator>
                <FormFieldSettings
                  fieldSettings={fieldSettings}
                  setFieldSettings={setFieldSettings}
                />
              </SessionValidator>
            }
          />

          
          <Route
            path="/workflow_optimization"
            element={
              <SessionValidator>
                <LoanTypeSelectionPage />
              </SessionValidator>
            } 
          />

          <Route
            path="/selection_steps_page"
            element={
              <SessionValidator>
                <SelectStepsPage />
              </SessionValidator>
            }
          />

          <Route
            path="/forms_page"
            element={
              <SessionValidator>
                <FormsPage />
              </SessionValidator>
            }
          />

          <Route
            path="/business_rule_management"
            element={
              <SessionValidator>
                <div>Business Rule Management</div>
              </SessionValidator>
            }
          />
          



          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
