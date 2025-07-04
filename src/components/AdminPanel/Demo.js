// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

// const UserSummary = () => {
//   const navigate = useNavigate();

//   const userData = [
//     { id: 1, name: "Arjun Mehta", role: "admin", email: "arjun.mehta@example.com", isActive: true },
//     { id: 2, name: "Neha Kapoor", role: "editor", email: "neha.k@example.com", isActive: false },
//     { id: 3, name: "Rahul Verma", role: "user", email: "rahul.v@example.com", isActive: true },
//     { id: 4, name: "Simran Sinha", role: "moderator", email: "simran.sinha@example.com", isActive: false },
//     { id: 5, name: "Yash Patel", role: "user", email: "yash.patel@example.com", isActive: true },
//   ];

//   const handleEdit = (user) => {
//     navigate("/editUser", { state: user });
//   };

//   const handleDelete = (userId) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       console.log("Deleted user with ID:", userId);
//     }
//   };

//   const handleAddUser = () => {
//     navigate("/addUser");
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">User Summary</h2>
//         <button
//           onClick={handleAddUser}
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         >
//           <FaPlus /> Add User
//         </button>
//       </div>

//       <div className="overflow-auto max-h-[450px] scrollbar-thin">
//         <table className="min-w-full text-sm text-left">
//           <thead className="sticky top-0 bg-gray-100 border-b">
//             <tr>
//               <th className="py-2 px-4">Name</th>
//               <th className="py-2 px-4">Role</th>
//               <th className="py-2 px-4">Email</th>
//               <th className="py-2 px-4">Active</th>
//               <th className="py-2 px-4 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {userData.map((user, index) => (
//               <tr key={index} className="border-b hover:bg-gray-50">
//                 <td className="py-2 px-4">{user.name}</td>
//                 <td className="py-2 px-4 capitalize">{user.role}</td>
//                 <td className="py-2 px-4">{user.email}</td>
//                 <td className="py-2 px-4">
//                   <span
//                     className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
//                       user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {user.isActive ? "Active" : "Inactive"}
//                   </span>
//                 </td>
//                 <td className="py-2 px-4 text-center space-x-4">
//                   <button
//                     onClick={() => handleEdit(user)}
//                     className="text-blue-600 hover:text-blue-800"
//                   >
//                     <FaEdit />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(user.id)}
//                     className="text-red-600 hover:text-red-800"
//                   >
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//            {/* {isAdmin ? (  */}
//           // <>        
                

//           //       <SidebarItem icon={MdSpaceDashboard}  label="Dashboard" path={["/admindashboard"]} />
                
//           //       <SidebarItem icon={PiCalendarStarBold} label="User Menu" path={["/user_menu_data"]} />
                
//           //       <SidebarItem icon={MdOutlineAnalytics} label="Role Creation" path={["/admin_user_data"]} />

//           //       <SidebarItem icon={MdOutlineAnalytics} label="Access Control Setup" path={["/access_control_setup", "/access_control"]} />

//           //       <SidebarItem icon={IoSearch} label="Organization Form" path={["/organization_form"]} />
                
//           //       <SidebarItem icon={HiOutlineNewspaper} label="System Configuration" path={["/loan_system_config"]} />

//           //       <SidebarItem icon={MdOutlineAnalytics} label="Application Form" path={["/application_form","/form_header"]} />        
                
//           //       <SidebarItem
//           //         icon={MdOutlineAnalytics}
//           //         label="Workflow Optimization"
//           //         path={["/custom_workflow","/selection_steps_page"]}
//           //         children={[
//           //           { label: "Process Authentication", path: "/auth" },
//           //           { label: "Custom Workflow", path: "/custom_workflow" },
//           //         ]}
//           //       />


                
//           //       <SidebarItem icon={MdOutlineAnalytics} label="Technical Rule Management" path={["/technical_rule_management"]} />
                
//           //       <SidebarItem icon={MdOutlineAnalytics} label="Business Rule Management" path={["/business_rule_management"]} />
                
//           //       <SidebarItem icon={MdOutlineAnalytics} label="System Monitoring and Performance" path={["/system_monitoring_and_performance"]} />
                
//           //       <SidebarItem icon={MdOutlineAnalytics} label="Integration Management" path={["/integration_management"]} />

                
//           //       <SidebarItem icon={MdOutlineAnalytics} label="Reporting and Analytics" path={["/reporting_and_analytics"]} />
                
//           //       <SidebarItem icon={HiOutlineNewspaper} label="Content and Documentation" path={["/content_and_documentation"]} />
                
//           //       <SidebarItem icon={IoBagRemoveOutline} label="Multi-Factor Authentication" path={["/multi_factor_authentication"]} />

//           //       <SidebarItem icon={IoBagRemoveOutline} label="Form Field Settings" path={["/form_field_settings"]} />
//           //       </>



// //           <>
// //   <SidebarItem icon={getIconByName("MdSpaceDashboard")} label="Dashboard" path={["/admindashboard"]} />

// //   <SidebarItem icon={getIconByName("PiUsersThreeBold")} label="User Menu" path={["/user_menu_data"]} />

// //   <SidebarItem icon={getIconByName("MdAdminPanelSettings")} label="Role Creation" path={["/admin_user_data"]} />

// //   <SidebarItem icon={getIconByName("MdSecurity")} label="Access Control Setup" path={["/access_control_setup", "/access_control"]} />

// //   <SidebarItem icon={getIconByName("IoBusiness")} label="Organization Form" path={["/organization_form"]} />

// //   <SidebarItem icon={getIconByName("HiOutlineCog6Tooth")} label="System Configuration" path={["/loan_system_config"]} />

// //   <SidebarItem icon={getIconByName("MdAppRegistration")} label="Application Form" path={["/application_form", "/form_header"]} />

// //   <SidebarItem
// //     icon={getIconByName("MdCompareArrows")}
// //     label="Workflow Optimization"
// //     path={["/custom_workflow", "/selection_steps_page"]}
// //     children={[
// //       { label: "Process Authentication", path: "/auth" },
// //       { label: "Custom Workflow", path: "/custom_workflow" },
// //     ]}
// //   />

// //   <SidebarItem icon={getIconByName("MdRule")} label="Technical Rule Management" path={["/technical_rule_management"]} />

// //   <SidebarItem icon={getIconByName("MdGavel")} label="Business Rule Management" path={["/business_rule_management"]} />

// //   <SidebarItem icon={getIconByName("MdMonitor")} label="System Monitoring and Performance" path={["/system_monitoring_and_performance"]} />

// //   <SidebarItem icon={getIconByName("MdSyncAlt")} label="Integration Management" path={["/integration_management"]} />

// //   <SidebarItem icon={getIconByName("MdQueryStats")} label="Reporting and Analytics" path={["/reporting_and_analytics"]} />

// //   <SidebarItem icon={getIconByName("HiOutlineDocumentText")} label="Content and Documentation" path={["/content_and_documentation"]} />

// //   <SidebarItem icon={getIconByName("IoShieldCheckmarkOutline")} label="Multi-Factor Authentication" path={["/multi_factor_authentication"]} />

// //   <SidebarItem icon={getIconByName("MdTune")} label="Form Field Settings" path={["/form_field_settings"]} />
// // </>

//           // <></>

//         // ):(
          
//         //   <>
//         //   <SidebarItem icon={MdSpaceDashboard}  label="Dashboard" path={["/userdashboard"]} />
//         //   <SidebarItem icon={MdOutlineAnalytics} label="Application Form" path={["/application_form","/form_header"]} />
//         //   </>

//         // )}
//     </div>
//   );
// };

// export default UserSummary;




// // import React, { useState, useEffect } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import { getMenusWithPermissions, getRoles } from "../api_service";
// // import { IoSearch } from "react-icons/io5";

// // // All icons
// // import * as MdIcons from "react-icons/md";
// // import * as PiIcons from "react-icons/pi";
// // import * as HiIcons from "react-icons/hi2";
// // import * as IoIcons from "react-icons/io5";

// // const allIcons = {
// //   ...MdIcons,
// //   ...PiIcons,
// //   ...HiIcons,
// //   ...IoIcons,
// // };

// // const getIconByName = (iconName) => {
// //   return allIcons[iconName] || MdIcons.MdOutlineAnalytics;
// // };

// // const SidebarItem = ({ icon: Icon, label, path, children = [] }) => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const [open, setOpen] = useState(false);

// //   const isActive = path.includes(location.pathname);
// //   const hasChildren = children.length > 0;
// //   const isChildActive = hasChildren && children.some(child => location.pathname === child.path);

// //   const handleClick = () => {
// //     if (hasChildren) {
// //       setOpen(!open);
// //     } else {
// //       navigate(path[0]);
// //     }
// //   };

// //   return (
// //     <>
// //       <li
// //         className={flex items-center justify-between px-6 py-3 rounded-l-full cursor-pointer ${
// //           isActive || isChildActive || open
// //             ? "bg-accent text-white font-semibold shadow-lg"
// //             : "text-gray-600 font-medium hover:bg-blue-50 hover:text-accent"
// //         }}
// //         onClick={handleClick}
// //       >
// //         <div className="flex items-center gap-3">
// //           <Icon className="text-lg" />
// //           <span>{label}</span>
// //         </div>
// //         {hasChildren && (
// //           <span className={${isActive || isChildActive ? "text-white" : "text-accent"}}>
// //             {open ? "▲" : "▼"}
// //           </span>
// //         )}
// //       </li>

// //       {open && children.length > 0 && (
// //         <ul className="ml-10 mt-1 space-y-1 text-sm text-gray-700">
// //           {children.map((child, index) => (
// //             <li
// //               key={index}
// //               className={cursor-pointer px-3 py-2 rounded-md transition-colors duration-150 ${
// //                 location.pathname === child.path
// //                   ? "bg-blue-100 text-accent font-medium"
// //                   : "text-gray-600 font-medium hover:bg-blue-50 hover:text-accent"
// //               }}
// //               onClick={() => navigate(child.path)}
// //             >
// //               {child.label}
// //             </li>
// //           ))}
// //         </ul>
// //       )}
// //     </>
// //   );
// // };

// // const DashboardSidebar = () => {
// //   const [menuItems, setMenuItems] = useState([]);
// //   const [username, setUsername] = useState("");
// //   // const [isAdmin, setIsAdmin] = useState(false);

 

// //   useEffect(() => {
// //     const loadMenus = async () => {
// //       try {
// //         const role = sessionStorage.getItem("role");

// //         const roles = await getRoles();

// //         const matchedRole = roles.data.find(r => r.roleName?.toLowerCase() === role?.toLowerCase());
// //         if (!matchedRole) {
// //           console.error("Role not found in fetched roles.");
// //           return;
// //         }
// //         const roleId = matchedRole.id;

// //         const data = await getMenusWithPermissions(roleId);

// //         const filterMenus = (menus) =>
// //           menus
// //             .filter((menu) => menu.canRead || menu.canWrite)
// //             .map((menu) => ({
// //               ...menu,
// //               subMenus: menu.subMenus
// //                 ? menu.subMenus.filter((sub) => sub.canRead || sub.canWrite)
// //                 : [],
// //             }));

// //         setMenuItems(filterMenus(data));
// //       } catch (err) {
// //         console.error("Failed to fetch menus with permissions", err);
// //       }
// //     };

// //     loadMenus();
// //   }, []);

// //   return (
// //     <aside className="w-72 bg-white h-screen flex flex-col">
// //       <div className="px-4 py-6">
// //         <div className="flex items-center gap-3">
// //           <div className="w-10 h-10 rounded-full bg-blue-200" />
// //           <div>
// //             <h2 className="text-lg font-semibold text-gray-800">File MG</h2>
// //             <p className="text-sm text-gray-900">{username}</p>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="px-4">
// //         <div className="flex items-center px-4 py-2 border border-gray-400 bg-gray-200 rounded-lg mb-4">
// //           <IoSearch className="text-secondary mr-2" />
// //           <input
// //             type="text"
// //             placeholder="Search"
// //             className="w-full bg-transparent outline-none placeholder-gray-500 text-sm"
// //           />
// //         </div>
// //       </div>

// //       <ul className="space-y-1 pl-5 overflow-y-auto h-full custom-scrollbar direction-rtl">
// //         <div className="direction-ltr">
// //           {menuItems.map((item) => (
// //             <SidebarItem
// //               key={item.menuId}
// //               icon={getIconByName(item.icon)}
// //               label={item.menuName}
// //               path={[item.url]}
// //               children={
// //                 item.subMenus?.map((sub) => ({
// //                   label: sub.menuName,
// //                   path: sub.url,
// //                 })) || []
// //               }
// //             />
// //           ))}
// //         </div>
// //       </ul>
// //     </aside>
// //   );
// // };

// // export default DashboardSidebar; 





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
//   "/form_header": <FormHeader />,
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
  "/form_header": <FormHeader />,
  "/workflow/custom": <LoanTypeSelectionPage />,
  "/selection_steps_page": <SelectStepsPage />,
  "/forms_page": <FormsPage />,
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






// const DocumentVerificationForm = ({ onSubmitSuccess }) => {
//   const [form, setForm] = useState({
//     documentType: "",
//     documentNumber: "",
//     issueDate: "",
//     expiryDate: "",
//     issuingAuthority: "",
//     consent: false,
//     documentFiles: [],
//   });

//   const [errors, setErrors] = useState({});
//   const [newFile, setNewFile] = useState(null);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setNewFile(file);
//   };

//   const handleAddFile = () => {
//     if (!newFile) return;
//     setForm((prev) => ({
//       ...prev,
//       documentFiles: [...prev.documentFiles, newFile],
//     }));
//     setNewFile(null);
//   };

//   const handleDeleteFile = (index) => {
//     setForm((prev) => {
//       const updatedFiles = [...prev.documentFiles];
//       updatedFiles.splice(index, 1);
//       return {
//         ...prev,
//         documentFiles: updatedFiles,
//       };
//     });
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!form.documentType) newErrors.documentType = "Required";
//     if (!form.documentNumber) newErrors.documentNumber = "Required";
//     if (!form.issueDate) newErrors.issueDate = "Required";
//     if (!form.expiryDate) newErrors.expiryDate = "Required";
//     if (!form.issuingAuthority) newErrors.issuingAuthority = "Required";
//     if (form.documentFiles.length === 0)
//       newErrors.documentFile = "At least one document is required";
//     if (!form.consent) newErrors.consent = "Consent required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

// //     {
// //     "documentType": "PAN",
// //     "documentNumber": "hfsfsfjasfsjka",
// //     "issueDate": "2000-01-01",
// //     "expiryDate": "2000-02-01",
// //     "issuingAuthority": "jfdsjdfjmv",
// //     "consent": true
// //     }

//     // {
//     // "applicationNumber": "APP123456",
//     // "user": {
//     // "userId": "USR001"
//     // },
//     // "documentNumber": "1234-5678-9012",
//     // "issueDate": "2022-01-01",
//     // "expiryDate": "2032-01-01",
//     // "issuingAuthority": "UIDAI",
//     // "filePath": "/uploads/documents/aadhar_card_usr001.pdf",
//     // "consentGiven": true
//     // }

//     const userId = sessionStorage.getItem("username");
//     const applicationNumber = sessionStorage.getItem("applicationNumber");
//     if (applicationNumber == null) {
//       alert("❌ Application number is missing!");
//       return;
//     }else if (userId == null){
//       alert("❌ User ID is missing!");
//       return;
//     }
//     const requestData = {
//       applicationNumber: applicationNumber,
//       user:{
//         userId: userId
//       },
//       documentNumber: form.documentNumber,
//       issueDate: form.issueDate,
//       expiryDate: form.expiryDate,
//       issuingAuthority: form.issuingAuthority,
//       filePath: form.filePath,
//       consentGiven: form.consent,
      
//     };
//     console.log(requestData)
//     const { documentFiles, ...formData } = form;
//     sessionStorage.setItem("documentVerification", JSON.stringify(formData));
//     console.log(formData);
//     const response = await addDocumentVerified(requestData);
//     alert(response?.message);
//     onSubmitSuccess();
//   };

//   return (
//     <div className="min-h-screen bg-white px-6 py-10">
//       <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
//         <h3 className="text-2xl font-bold mb-10">Document Verification</h3>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Document Type */}
//           <div>
//             <label className="block mb-1 text-sm font-medium">Document Type</label>
//             <select
//               name="documentType"
//               className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-1 bg-transparent"
//               value={form.documentType}
//               onChange={handleChange}
//             >
//               <option value="">Select Type</option>
//               <option value="Aadhaar">Aadhaar</option>
//               <option value="PAN">PAN</option>
//               <option value="Passport">Passport</option>
//               <option value="Driving License">Driving License</option>
//             </select>
//             {errors.documentType && (
//               <p className="text-red-500 text-sm mt-1">{errors.documentType}</p>
//             )}
//           </div>

//           {/* Document Number */}
//           <div>
//             <label className="block mb-1 text-sm font-medium">Document Number</label>
//             <input
//               name="documentNumber"
//               className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-1"
//               value={form.documentNumber}
//               onChange={handleChange}
//             />
//             {errors.documentNumber && (
//               <p className="text-red-500 text-sm mt-1">{errors.documentNumber}</p>
//             )}
//           </div>

//           {/* Issue Date */}
//           <div>
//             <label className="block mb-1 text-sm font-medium">Issue Date</label>
//             <input
//               type="date"
//               name="issueDate"
//               className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-1"
//               value={form.issueDate}
//               onChange={handleChange}
//             />
//             {errors.issueDate && (
//               <p className="text-red-500 text-sm mt-1">{errors.issueDate}</p>
//             )}
//           </div>

//           {/* Expiry Date */}
//           <div>
//             <label className="block mb-1 text-sm font-medium">Expiry Date</label>
//             <input
//               type="date"
//               name="expiryDate"
//               className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-1"
//               value={form.expiryDate}
//               onChange={handleChange}
//             />
//             {errors.expiryDate && (
//               <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
//             )}
//           </div>

//           {/* Issuing Authority */}
//           <div>
//             <label className="block mb-1 text-sm font-medium">Issuing Authority</label>
//             <input
//               name="issuingAuthority"
//               className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-1"
//               value={form.issuingAuthority}
//               onChange={handleChange}
//             />
//             {errors.issuingAuthority && (
//               <p className="text-red-500 text-sm mt-1">{errors.issuingAuthority}</p>
//             )}
//           </div>

//           {/* File Upload Section */}
//           <div>
//             <label className="block mb-1 text-sm font-medium">Upload Document (PDF, Image)</label>
//             <div className="flex items-center gap-4">
//               <input
//                 type="file"
//                 accept=".pdf,.jpg,.jpeg,.png"
//                 className="flex-1 border-b border-gray-400 focus:border-blue-600 outline-none py-1"
//                 onChange={handleFileChange}
//               />
//               <button
//                 type="button"
//                 onClick={handleAddFile}
//                className="bg-[#029aaa] text-white px-6 py-2 rounded hover:bg-[#01c4d5] transition flex items-center gap-2"
//               >
//                 Add
//               </button>
//             </div>
//             {errors.documentFile && (
//               <p className="text-red-500 text-sm mt-1">{errors.documentFile}</p>
//             )}

//             {/* Show uploaded files */}
//             <ul className="mt-4 space-y-2">
//               {form.documentFiles.map((file, idx) => (
//                 <li
//                   key={idx}
//                   className="flex justify-between items-center bg-gray-100 p-2 rounded"
//                 >
//                   <span className="text-sm truncate max-w-[50%]">{file.name}</span>
//                   <div className="flex gap-3">
//                     <a
//                       href={URL.createObjectURL(file)}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 text-sm underline"
//                     >
//                       View
//                     </a>
//                     <button
//                       type="button"
//                       onClick={() => handleDeleteFile(idx)}
//                       className="text-red-600 text-sm hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Consent */}
//         <div className="mt-8">
//           <label className="inline-flex items-center">
//             <input
//               type="checkbox"
//               name="consent"
//               checked={form.consent}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             <span className="text-sm">I consent to document verification</span>
//           </label>
//           {errors.consent && (
//             <p className="text-red-500 text-sm mt-1">{errors.consent}</p>
//           )}
//         </div>

//         {/* Submit */}
//         <div className="mt-8">
//           <button
//             type="submit"
//            className="bg-[#029aaa] text-white px-6 py-2 rounded hover:bg-[#01c4d5] transition flex items-center gap-2"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// const DocumentVerificationForm = ({ onSubmitSuccess }) => {
//   const [form, setForm] = useState({
//     documentType: "",
//     documentNumber: "",
//     issueDate: "",
//     expiryDate: "",
//     issuingAuthority: "",
//     consent: false,
//     documentFiles: [],
//   });

//   const [errors, setErrors] = useState({});
//   const [newFile, setNewFile] = useState(null);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setNewFile(file);
//   };

//   const handleAddFile = () => {
//     if (!newFile) return;
//     setForm((prev) => ({
//       ...prev,
//       documentFiles: [...prev.documentFiles, newFile],
//     }));
//     setNewFile(null);
//   };

//   const handleDeleteFile = (index) => {
//     setForm((prev) => {
//       const updatedFiles = [...prev.documentFiles];
//       updatedFiles.splice(index, 1);
//       return {
//         ...prev,
//         documentFiles: updatedFiles,
//       };
//     });
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!form.documentType) newErrors.documentType = "Required";
//     if (!form.documentNumber) newErrors.documentNumber = "Required";
//     if (!form.issueDate) newErrors.issueDate = "Required";
//     if (!form.expiryDate) newErrors.expiryDate = "Required";
//     if (!form.issuingAuthority) newErrors.issuingAuthority = "Required";
//     if (form.documentFiles.length === 0)
//       newErrors.documentFile = "At least one document is required";
//     if (!form.consent) newErrors.consent = "Consent required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     const userId = sessionStorage.getItem("username");
//     const applicationNumber = sessionStorage.getItem("applicationNumber");

//     if (!applicationNumber) {
//       alert("❌ Application number is missing!");
//       return;
//     }
//     if (!userId) {
//       alert("❌ User ID is missing!");
//       return;
//     }

//     const requestData = {
//       applicationNumber,
//       user: {
//         userId,
//       },
//       documentNumber: form.documentNumber,
//       issueDate: form.issueDate,
//       expiryDate: form.expiryDate,
//       issuingAuthority: form.issuingAuthority,
//       filePath: "N/A", // Update this when file upload logic is implemented
//       consentGiven: form.consent,
//     };

//     const { documentFiles, ...formData } = form;
//     sessionStorage.setItem("documentVerification", JSON.stringify(formData));
//     console.log("FormData:", formData);
//     console.log("RequestData:", requestData);

//     const response = await addDocumentVerified(requestData);
//     alert(response?.message);
//     onSubmitSuccess();
//   };

//   return (
//     <div className="min-h-screen bg-white px-6 py-10">
//       <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
//         <h3 className="text-2xl font-bold mb-10">Document Verification</h3>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div>
//             <label className="block mb-1 text-sm font-medium">Document Type</label>
//             <select
//               name="documentType"
//               className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-1 bg-transparent"
//               value={form.documentType}
//               onChange={handleChange}
//             >
//               <option value="">Select Type</option>
//               <option value="Aadhaar">Aadhaar</option>
//               <option value="PAN">PAN</option>
//               <option value="Passport">Passport</option>
//               <option value="Driving License">Driving License</option>
//             </select>
//             {errors.documentType && (
//               <p className="text-red-500 text-sm mt-1">{errors.documentType}</p>
//             )}
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium">Document Number</label>
//             <input
//               name="documentNumber"
//               className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-1"
//               value={form.documentNumber}
//               onChange={handleChange}
//             />
//             {errors.documentNumber && (
//               <p className="text-red-500 text-sm mt-1">{errors.documentNumber}</p>
//             )}
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium">Issue Date</label>
//             <input
//               type="date"
//               name="issueDate"
//               className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-1"
//               value={form.issueDate}
//               onChange={handleChange}
//             />
//             {errors.issueDate && (
//               <p className="text-red-500 text-sm mt-1">{errors.issueDate}</p>
//             )}
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium">Expiry Date</label>
//             <input
//               type="date"
//               name="expiryDate"
//               className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-1"
//               value={form.expiryDate}
//               onChange={handleChange}
//             />
//             {errors.expiryDate && (
//               <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
//             )}
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium">Issuing Authority</label>
//             <input
//               name="issuingAuthority"
//               className="w-full border-b border-gray-400 focus:border-blue-600 outline-none py-1"
//               value={form.issuingAuthority}
//               onChange={handleChange}
//             />
//             {errors.issuingAuthority && (
//               <p className="text-red-500 text-sm mt-1">{errors.issuingAuthority}</p>
//             )}
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium">Upload Document (PDF, Image)</label>
//             <div className="flex items-center gap-4">
//               <input
//                 type="file"
//                 accept=".pdf,.jpg,.jpeg,.png"
//                 className="flex-1 border-b border-gray-400 focus:border-blue-600 outline-none py-1"
//                 onChange={handleFileChange}
//               />
//               <button
//                 type="button"
//                 onClick={handleAddFile}
//                 className="bg-[#029aaa] text-white px-6 py-2 rounded hover:bg-[#01c4d5] transition flex items-center gap-2"
//               >
//                 Add
//               </button>
//             </div>
//             {errors.documentFile && (
//               <p className="text-red-500 text-sm mt-1">{errors.documentFile}</p>
//             )}

//             <ul className="mt-4 space-y-2">
//               {form.documentFiles.map((file, idx) => (
//                 <li
//                   key={idx}
//                   className="flex justify-between items-center bg-gray-100 p-2 rounded gap-4"
//                 >
//                   <div className="flex flex-col gap-1 max-w-[60%]">
//                     <span className="text-sm truncate">{file.name}</span>
//                     {file.type.startsWith("image/") ? (
//                       <img
//                         src={URL.createObjectURL(file)}
//                         alt="Preview"
//                         className="w-24 h-24 object-cover border rounded"
//                       />
//                     ) : file.type === "application/pdf" ? (
//                       <iframe
//                         src={URL.createObjectURL(file)}
//                         title="PDF Preview"
//                         className="w-24 h-24 border rounded"
//                       />
//                     ) : (
//                       <span className="text-xs text-gray-500">No preview available</span>
//                     )}
//                   </div>

//                   <div className="flex gap-3">
//                     <a
//                       href={URL.createObjectURL(file)}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 text-sm underline"
//                     >
//                       View
//                     </a>
//                     <button
//                       type="button"
//                       onClick={() => handleDeleteFile(idx)}
//                       className="text-red-600 text-sm hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div className="mt-8">
//           <label className="inline-flex items-center">
//             <input
//               type="checkbox"
//               name="consent"
//               checked={form.consent}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             <span className="text-sm">I consent to document verification</span>
//           </label>
//           {errors.consent && (
//             <p className="text-red-500 text-sm mt-1">{errors.consent}</p>
//           )}
//         </div>

//         <div className="mt-8">
//           <button
//             type="submit"
//             className="bg-[#029aaa] text-white px-6 py-2 rounded hover:bg-[#01c4d5] transition flex items-center gap-2"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };


  // const DocumentVerificationForm = ({ onSubmitSuccess }) => {
  //   const [form, setForm] = useState({
  //     documentType: "",
  //     documentNumber: "",
  //     issueDate: "",
  //     expiryDate: "",
  //     issuingAuthority: "",
  //     consent: false,
  //     documentFiles: [],
  //   });

  //   const [errors, setErrors] = useState({});
  //   const [newFile, setNewFile] = useState(null);

  //   const handleChange = (e) => {
  //     const { name, value, type, checked } = e.target;
  //     setForm((prev) => ({
  //       ...prev,
  //       [name]: type === "checkbox" ? checked : value,
  //     }));
  //   };

  //   const handleFileChange = (e) => {
  //     const file = e.target.files[0];
  //     setNewFile(file);
  //   };

  //   const handleAddFile = () => {
  //     if (!newFile) return;
  //     setForm((prev) => ({
  //       ...prev,
  //       documentFiles: [...prev.documentFiles, newFile],
  //     }));
  //     setNewFile(null);
  //   };

  //   const handleDeleteFile = (index) => {
  //     setForm((prev) => {
  //       const updatedFiles = [...prev.documentFiles];
  //       updatedFiles.splice(index, 1);
  //       return {
  //         ...prev,
  //         documentFiles: updatedFiles,
  //       };
  //     });
  //   };

  //   const validate = () => {
  //     const newErrors = {};
  //     if (!form.documentType) newErrors.documentType = "Required";
  //     if (!form.documentNumber) newErrors.documentNumber = "Required";
  //     if (!form.issueDate) newErrors.issueDate = "Required";
  //     if (!form.expiryDate) newErrors.expiryDate = "Required";
  //     if (!form.issuingAuthority) newErrors.issuingAuthority = "Required";
  //     if (form.documentFiles.length === 0)
  //       newErrors.documentFile = "At least one document is required";
  //     if (!form.consent) newErrors.consent = "Consent required";
  //     setErrors(newErrors);
  //     return Object.keys(newErrors).length === 0;
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     if (!validate()) return;

  //     const userId = sessionStorage.getItem("username");
  //     const applicationNumber = sessionStorage.getItem("applicationNumber");

  //     if (!applicationNumber) {
  //       alert("❌ Application number is missing!");
  //       return;
  //     }
  //     if (!userId) {
  //       alert("❌ User ID is missing!");
  //       return;
  //     }

  //     const requestData = {
  //       applicationNumber,
  //       user: { userId },
  //       documentNumber: form.documentNumber,
  //       issueDate: form.issueDate,
  //       expiryDate: form.expiryDate,
  //       issuingAuthority: form.issuingAuthority,
  //       filePath: "N/A", // Placeholder
  //       consentGiven: form.consent,
  //     };

  //     const { documentFiles, ...formData } = form;
  //     sessionStorage.setItem("documentVerification", JSON.stringify(formData));
  //     console.log("RequestData:", requestData);

  //     const response = await addDocumentVerified(requestData);
  //     alert(response?.message);
  //     onSubmitSuccess();
  //   };

  //   return (
  //     <div className="min-h-screen px-4 py-10">
  //       <form
  //         onSubmit={handleSubmit}
  //         className="max-w-5xl mx-auto rounded-2xl p-8 space-y-10"
  //       >
  //         <h3 className="text-3xl font-bold text-center text-blue-700">📄 Document Verification</h3>

  //         <div className="grid md:grid-cols-2 gap-8">
  //           {[
  //             {
  //               label: "Document Type",
  //               element: (
  //                 <select
  //                   name="documentType"
  //                   className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
  //                   value={form.documentType}
  //                   onChange={handleChange}
  //                 >
  //                   <option value="">Select Type</option>
  //                   <option value="Aadhaar">Aadhaar</option>
  //                   <option value="PAN">PAN</option>
  //                   <option value="Passport">Passport</option>
  //                   <option value="Driving License">Driving License</option>
  //                 </select>
  //               ),
  //               error: errors.documentType,
  //             },
  //             {
  //               label: "Document Number",
  //               element: (
  //                 <input
  //                   name="documentNumber"
  //                   className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
  //                   value={form.documentNumber}
  //                   onChange={handleChange}
  //                 />
  //               ),
  //               error: errors.documentNumber,
  //             },
  //             {
  //               label: "Issue Date",
  //               element: (
  //                 <input
  //                   type="date"
  //                   name="issueDate"
  //                   className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
  //                   value={form.issueDate}
  //                   onChange={handleChange}
  //                 />
  //               ),
  //               error: errors.issueDate,
  //             },
  //             {
  //               label: "Expiry Date",
  //               element: (
  //                 <input
  //                   type="date"
  //                   name="expiryDate"
  //                   className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
  //                   value={form.expiryDate}
  //                   onChange={handleChange}
  //                 />
  //               ),
  //               error: errors.expiryDate,
  //             },
  //             {
  //               label: "Issuing Authority",
  //               element: (
  //                 <input
  //                   name="issuingAuthority"
  //                   className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
  //                   value={form.issuingAuthority}
  //                   onChange={handleChange}
  //                 />
  //               ),
  //               error: errors.issuingAuthority,
  //             },
  //           ].map((field, idx) => (
  //             <div key={idx}>
  //               <label className="block mb-1 text-sm font-medium">{field.label}</label>
  //               {field.element}
  //               {field.error && <p className="text-red-500 text-sm mt-1">{field.error}</p>}
  //             </div>
  //           ))}
  //         </div>

  //         {/* File Upload Section */}
  //         <div className="bg-blue-50 p-6 rounded-xl shadow-inner">
  //           <label className="block mb-2 text-sm font-semibold text-blue-800">
  //             Upload Document (PDF, Image)
  //           </label>
  //           <div className="flex flex-col md:flex-row items-center gap-4">
  //             <input
  //               type="file"
  //               accept=".pdf,.jpg,.jpeg,.png"
  //               className="flex-1 border rounded-lg px-3 py-2"
  //               onChange={handleFileChange}
  //             />
  //             <button
  //               type="button"
  //               onClick={handleAddFile}
  //               className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
  //             >
  //               ➕ Add
  //             </button>
  //           </div>
  //           {errors.documentFile && (
  //             <p className="text-red-500 text-sm mt-2">{errors.documentFile}</p>
  //           )}

  //           <ul className="mt-4 space-y-3">
  //             {form.documentFiles.map((file, idx) => (
  //               <li
  //                 key={idx}
  //                 className="flex justify-between items-center bg-white border rounded-lg p-3 shadow-sm"
  //               >
  //                 <div className="flex flex-col gap-1 max-w-[60%]">
  //                   <span className="text-sm font-medium text-gray-800 truncate">{file.name}</span>
  //                   {file.type.startsWith("image/") ? (
  //                     <img
  //                       src={URL.createObjectURL(file)}
  //                       alt="Preview"
  //                       className="w-24 h-24 object-cover border rounded"
  //                     />
  //                   ) : file.type === "application/pdf" ? (
  //                     <iframe
  //                       src={URL.createObjectURL(file)}
  //                       title="PDF Preview"
  //                       className="w-24 h-24 border rounded"
  //                     />
  //                   ) : (
  //                     <span className="text-xs text-gray-500">No preview available</span>
  //                   )}
  //                 </div>
  //                 <div className="flex flex-col gap-1 items-end">
  //                   <a
  //                     href={URL.createObjectURL(file)}
  //                     target="_blank"
  //                     rel="noopener noreferrer"
  //                     className="text-blue-600 text-sm underline"
  //                   >
  //                     View
  //                   </a>
  //                   <button
  //                     type="button"
  //                     onClick={() => handleDeleteFile(idx)}
  //                     className="text-red-500 text-sm hover:underline"
  //                   >
  //                     Delete
  //                   </button>
  //                 </div>
  //               </li>
  //             ))}
  //           </ul>
  //         </div>

  //         {/* Consent */}
  //         <div className="flex items-center gap-2">
  //           <input
  //             type="checkbox"
  //             name="consent"
  //             checked={form.consent}
  //             onChange={handleChange}
  //             className="w-4 h-4"
  //           />
  //           <label className="text-sm">I consent to document verification</label>
  //         </div>
  //         {errors.consent && (
  //           <p className="text-red-500 text-sm mt-1">{errors.consent}</p>
  //         )}

  //         {/* Submit */}
  //         <div className="text-center">
  //           <button
  //             type="submit"
  //             className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-8 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
  //           >
  //             🚀 Submit
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   );
  // };
