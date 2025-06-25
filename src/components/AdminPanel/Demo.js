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