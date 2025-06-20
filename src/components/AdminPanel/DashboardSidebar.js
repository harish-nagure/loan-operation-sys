import React, {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  PiCalendarStarBold,
  PiFolders,
} from "react-icons/pi";
import {
  MdOutlineAnalytics,
  MdSpaceDashboard
} from "react-icons/md";
import {
  HiOutlineNewspaper,
} from "react-icons/hi2";
import {
  IoBagRemoveOutline,
  IoSearch,
} from "react-icons/io5";

const SidebarItem = ({ icon: Icon, label, path, children = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // const isActive = location.pathname === path;
  
  // const isActive = path.includes(location.pathname);

  const [open, setOpen] = useState(false);
  const isActive = path.includes(location.pathname);
  const hasChildren = children.length > 0;
  const isChildActive = hasChildren && children.some(child => location.pathname === child.path);

  
  
  // return (
  //   <li
  //     className={`flex items-center gap-3 px-6 py-3 rounded-l-full cursor-pointer transition-colors duration-200 ${
  //       isActive
  //         ? "bg-gray-100 text-accent font-semibold shadow"
  //         : "text-gray-600 hover:bg-blue-50 hover:text-accent"
  //     }`}
  //     onClick={() => navigate(path[0])}
  //   >
  //     <Icon className="text-lg" />
  //     <span>{label}</span>
  //   </li>
  // );
  
  
  const handleClick = () => {
    if (hasChildren) {
      
      // navigate(path[0]);
      setOpen(!open);
      
    } else {
      navigate(path[0]);
    }
  };

  

  return (
    <>
      <li
        className={`flex items-center justify-between px-6 py-3 rounded-l-full cursor-pointer ${
          isActive || isChildActive || open
            ? "bg-accent text-white font-semibold shadow-lg"
            : "text-gray-600 font-medium hover:bg-blue-50 hover:text-accent"
        }`}
        onClick={handleClick}
      >
        <div className="flex items-center gap-3">
          <Icon className="text-lg" />
          <span>{label}</span>
        </div>
        {hasChildren && <span className={` ${isActive || isChildActive ? "text-white " : "text-accent"}`}>{open ? "▲" : "▼"}</span>}
      </li>

      {open && children && (
        <ul className="ml-10 mt-1 space-y-1 text-sm text-gray-700">
          {children.map((child, index) => (
            <li
              key={index}
              className={`cursor-pointer px-3 py-2 rounded-md transition-colors duration-150 ${
                location.pathname === child.path
                  ? "bg-blue-100 text-accent font-medium "
                  : " text-gray-600 font-medium hover:bg-blue-50 hover:text-accent"
              }`}
              onClick={() => navigate(child.path)}
            >
              {child.label}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

const DashboardSidebar = () => {


    const [username, setUsername] = useState("");
    
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    const role = sessionStorage.getItem("role");
    if (storedUsername) {
      setUsername(storedUsername);
        }
    if (role?.toLowerCase() === "admin") setIsAdmin(true);
    }, []);
  return (
    <aside className="w-72 bg-white h-screen flex flex-col">
      <div className="px-4 py-6 ">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-200" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">File MG</h2>
            <p className="text-sm text-gray-900">{username}</p>
          </div>
        </div>
      </div>
      <div className="px-4">
        <div className="flex items-center px-4 py-2 border border-gray-400 bg-gray-200 rounded-lg mb-4">
          <IoSearch className="text-secondary mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent outline-none placeholder-gray-500 text-sm"
          />
        </div>
      </div>

      {/* <div className="text-xs font-bold text-accent px-4 uppercase mb-3">Menu</div> */}
      <ul className="space-y-1 pl-5 overflow-y-auto h-full custom-scrollbar direction-rtl">
        
        <div className="direction-ltr">

        
{isAdmin ? ( 
  <>        
        
        <SidebarItem icon={MdSpaceDashboard}  label="Dashboard" path={["/admindashboard"]} />
        
        <SidebarItem icon={PiCalendarStarBold} label="User Menu" path={["/user_menu_data"]} />
        
        <SidebarItem icon={MdOutlineAnalytics} label="Role Creation" path={["/admin_user_data"]} />

        <SidebarItem icon={MdOutlineAnalytics} label="Access Control Setup" path={["/access_control_setup", "/access_control"]} />

        <SidebarItem icon={IoSearch} label="Organization Form" path={["/organization_form"]} />
        
        <SidebarItem icon={HiOutlineNewspaper} label="System Configuration" path={["/loan_system_config"]} />

        <SidebarItem icon={MdOutlineAnalytics} label="Application Form" path={["/application_form","/form_header"]} />



        
        
        <SidebarItem
          icon={MdOutlineAnalytics}
          label="Workflow Optimization"
          path={["/custom_workflow","/selection_steps_page"]}
          children={[
            { label: "Process Authentication", path: "/auth" },
            { label: "Custom Workflow", path: "/custom_workflow" },
          ]}
        />


        
        <SidebarItem icon={MdOutlineAnalytics} label="Technical Rule Management" path={["/technical_rule_management"]} />
        
        <SidebarItem icon={MdOutlineAnalytics} label="Business Rule Management" path={["/business_rule_management"]} />
        
        <SidebarItem icon={MdOutlineAnalytics} label="System Monitoring and Performance" path={["/system_monitoring_and_performance"]} />
        
        <SidebarItem icon={MdOutlineAnalytics} label="Integration Management" path={["/integration_management"]} />

        
        <SidebarItem icon={MdOutlineAnalytics} label="Reporting and Analytics" path={["/reporting_and_analytics"]} />
        
        <SidebarItem icon={HiOutlineNewspaper} label="Content and Documentation" path={["/content_and_documentation"]} />
        
        <SidebarItem icon={IoBagRemoveOutline} label="Multi-Factor Authentication" path={["/multi_factor_authentication"]} />

        <SidebarItem icon={IoBagRemoveOutline} label="Form Field Settings" path={["/form_field_settings"]} />
        </>
):(
          <>

          <SidebarItem icon={MdSpaceDashboard}  label="Dashboard" path={["/userdashboard"]} />
          <SidebarItem icon={MdOutlineAnalytics} label="Application Form" path={["/application_form","/form_header"]} />
          </>
        )}

        </div>
      </ul>

    </aside>
  );
};

export default DashboardSidebar;
