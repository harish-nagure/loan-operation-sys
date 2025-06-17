import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import {
  FaTachometerAlt,
  FaPhone,
  FaCog,
  FaChartLine,
  FaUsers,
  FaQuestionCircle,
  FaUserCircle,
  FaInfoCircle,
  FaBell,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHead from "./DashboardHead";

import {
  User,
  Settings,
  ShieldCheck,
  Lock,
  Building,
  LogIn,
  FileText,
  Code,
  Sliders,
  Activity,
  Layers,
  Shuffle,
  BarChart2,
  File,
  
  Settings2,
} from "lucide-react";

const iconMap = {
  dashboard: FaTachometerAlt,
  "contact us": FaPhone,
  settings: FaCog,
  reports: FaChartLine,
  users: FaUsers,
  help: FaQuestionCircle,
  profile: FaUserCircle,
  about: FaInfoCircle,
  notifications: FaBell,

  // Lucide-react keys
  user: User,
  shield: ShieldCheck,
  lock: Lock,
  building: Building,
  "log-in": LogIn,
  "file-text": FileText,
  code: Code,
  sliders: Sliders,
  activity: Activity,
  layers: Layers,
  shuffle: Shuffle,
  "bar-chart-2": BarChart2,
  file: File,
  
  "settings-2": Settings2,
};




const AccessControl = () => {
  const navigate = useNavigate();
  const [currentUserRole, setCurrentUserRole] = useState("admin");
  const [menuList, setMenuList] = useState([]);
  const [expandedMenus, setExpandedMenus] = useState({});

useEffect(() => {
  const sidebarMenus = [
  {
    id: "1",
    name: "User Menu",
    iconKey: "user",
    read: false,
    write: false,
    view: false,
    all: false,
    children: [],
  },
  {
    id: "2",
    name: "Role Creation",
    iconKey: "shield",
    read: false,
    write: false,
    view: false,
    all: false,
    children: [],
  },
  {
    id: "3",
    name: "Access Control",
    iconKey: "lock",
    read: false,
    write: false,
    view: false,
    all: false,
    children: [],
  },
  {
    id: "4",
    name: "Organization Form",
    iconKey: "building",
    read: false,
    write: false,
    view: false,
    all: false,
    children: [],
  },
  {
    id: "5",
    name: "Login",
    iconKey: "log-in",
    read: false,
    write: false,
    view: false,
    all: false,
    children: [],
  },
  {
    id: "6",
    name: "System Configuration",
    iconKey: "settings",
    read: false,
    write: false,
    view: false,
    all: false,
    children: [],
  },
  {
    id: "7",
    name: "Application Form",
    iconKey: "file-text",
    read: false,
    write: false,
    view: false,
    all: false,
    children: [],
  },
  {
    id: "8",
    name: "Technical Role Management",
    iconKey: "code",
    read: false,
    write: false,
    view: false,
    all: false,
    children: [],
  },
  {
    id: "9",
    name: "Bussiness Rule Management",
    iconKey: "sliders",
    read: false,
    write: false,
    view: false,
    all: false,
    children: [],
  },
  {
    id: "10",
    name: "System Monitoring and Performance",
    iconKey: "activity",
    read: false,
    write: false,
    view: false,
    all: false,
    children: [],
  },
  {
    id: "11",
    name: "Integration Management",
    iconKey: "layers",
    read: false,
    write: false,
    view: false,
    all: false,
    children: [],
  },
  {
    id: "12",
    name: "Workflow Optimization",
    iconKey: "settings",
    read: false,
    write: false,
    view: false,
    all: false,
    children: [
      {
        id: "12-1",
        name: "Process Authentication",
        iconKey: "shield-check",
        read: false,
        write: false,
        view: false,
        all: false,
      },
      {
        id: "12-2",
        name: "Custom Workflow",
        iconKey: "shuffle",
        read: false,
        write: false,
        view: false,
        all: false,
      },
    ],
  },
  {
    id: "13",
    name: "Reporting and Analytics",
    iconKey: "bar-chart-2",
    read: false,
    write: false,
    view: false,
    all: false,
    children: [],
  },
  {
    id: "14",
    name: "Content and Documnetation",
    iconKey: "file",
    read: false,
    write: false,
    view: false,
    all: false,
    children: [],
  },
  {
    id: "15",
    name: "Multi-Factor Authentication",
    iconKey: "shield",
    read: false,
    write: false,
    view: false,
    all: false,
    children: [],
  },
  {
    id: "16",
    name: "Form Field Settings",
    iconKey: "settings-2",
    read: false,
    write: false,
    view: false,
    all: false,
    children: [],
  },
];


  const storedMenus = sessionStorage.getItem("menus");
  const addedMenus = storedMenus ? JSON.parse(storedMenus) : [];

  // Avoid duplicates based on menu id
  const uniqueAddedMenus = addedMenus.filter(
    (added) => !sidebarMenus.some((existing) => existing.id === added.id)
  );

  // Merge default menus + hardcoded menus + added ones
  const fullMenus = [ ...sidebarMenus, ...uniqueAddedMenus];
  setMenuList(fullMenus);
}, []);



  const toggleExpand = (id) => {
    setExpandedMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const editMenu = (menu) => {
    navigate("/menu_creation");
  };

  const handlePermissionChange = (id, type) => {
    const updatePermissions = (item) => {
      const updated = { ...item };
      if (type === "read") {
        updated.read = !updated.read;
        if (!updated.read) {
          updated.write = false;
          updated.view = false;
          updated.all = false;
        }
      } else if (type === "write") {
        updated.write = !updated.write;
        if (updated.write) updated.read = true;
        else updated.all = false;
      } else if (type === "view") {
        updated.view = !updated.view;
        if (updated.view) updated.read = true;
        else updated.all = false;
      } else if (type === "all") {
        updated.all = !updated.all;
        updated.read = updated.all;
        updated.write = updated.all;
        updated.view = updated.all;
      }
      return updated;
    };

    const updateMenuList = (menus) =>
      menus.map((menu) => {
        if (menu.id === id) return updatePermissions(menu);
        if (menu.children) {
          return { ...menu, children: updateMenuList(menu.children) };
        }
        return menu;
      });

    setMenuList(updateMenuList(menuList));
  };

  const handleSavePermissions = () => {
    const flattenMenus = (menus) => {
      let flat = [];
      menus.forEach((menu) => {
        const { children, ...rest } = menu;
        flat.push(rest);
        if (children?.length) flat = flat.concat(flattenMenus(children));
      });
      return flat;
    };
    const flatMenus = flattenMenus(menuList);
    sessionStorage.setItem("menus", JSON.stringify(flatMenus));
    alert("Permissions saved!");
  };

  const renderMenuRow = (menu, level = 0, isChild = false) => {
    const hasChildren = menu.children?.length > 0;
    const isExpanded = expandedMenus[menu.id];
    const iconKey = menu.iconKey?.toLowerCase?.();
    const IconComponent = iconMap[iconKey];

    return (
      <React.Fragment key={menu.id}>
        <tr
          className={`border-t text-center hover:bg-gray-50 ${
            level === 0 ? "bg-gray-100 font-semibold" : ""
          }`}
        >
          <td className="p-3 text-left">
            <div
              className="flex items-center cursor-pointer select-none"
              style={{ paddingLeft: `${level * 1.5}rem` }}
              onClick={() => hasChildren && toggleExpand(menu.id)}
            >
              {hasChildren ? (
                <span className="mr-2 text-accent">
                  {isExpanded ? "▼" : "▶"}
                </span>
              ) : (
                <span className="inline-block w-4 mr-2" />
              )}
              {isChild && (
                <span className="text-gray-400 mr-1 select-none">└──</span>
              )}
              {IconComponent ? (
                <IconComponent className="text-secondary bg-white rounded-full p-1 text-2xl mr-2 shadow-sm" />
              ) : (
                <span className="text-xl mr-2">📁</span>
              )}
              <Link to="#" className="hover:underline text-gray-800">
                {menu.name}
              </Link>
            </div>
          </td>
          {["read", "write", "all"].map((perm) => (
            <td key={perm}>
              <input
                type="checkbox"
                checked={menu[perm]}
                onChange={() => handlePermissionChange(menu.id, perm)}
                className="scale-125 accent-accent"
              />
            </td>
          ))}
          <td className="flex justify-center gap-2 py-2">
            <button
              onClick={() => editMenu(menu)}
              className="text-blue-500 hover:underline text-sm"
            >
              <FaEdit />
            </button>
            <button className="text-red-500 hover:underline text-sm">
              <FaTrash />
            </button>
          </td>
        </tr>

        {hasChildren &&
          isExpanded &&
          menu.children.map((child) =>
            renderMenuRow(child, level + 1, true)
          )}
      </React.Fragment>
    );
  };

  return (
    <div className="lg:flex md:block font-inter">
      <div className="h-screen hidden lg:block fixed z-20">
        <DashboardSidebar />
      </div>
      <main className="flex-1 lg:ml-72">
        <DashboardHead />
        <div className="min-h-screen bg-gray-100 p-8">
          <div className="bg-white rounded-2xl shadow-lg max-w-5xl mx-auto p-8">
            <h2 className="text-2xl font-bold text-accent mb-6">
             Access Control Management
            </h2>

             { /* <div className="mb-6 flex items-center gap-4">
              <label
                htmlFor="roleSelect"
                className="font-semibold text-gray-700"
              >
                Role Access:
              </label>
              <select
                id="roleSelect"
                value={currentUserRole}
                onChange={(e) => setCurrentUserRole(e.target.value)}
                className="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div> */ }

            <table className="w-full border border-gray-300 rounded-xl overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left">Menu Name</th>
                  <th className="p-3 text-center">Read</th>
                  <th className="p-3 text-center">Write</th>
                  {/* <th className="p-3 text-center">View</th> */}
                  <th className="p-3 text-center">All</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {menuList.length > 0 ? (
                  menuList.map((menu) => renderMenuRow(menu))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-5 text-center text-gray-500">
                      No menus found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

          <div className="flex justify-end gap-4 mt-6">
               { /* <button
                onClick={() => navigate("/menu_creation")}
                className="bg-accent text-white px-5 py-2 rounded-xl hover:bg-secondary"
              >
                Add Menu
              </button> */} 
              <button
                onClick={handleSavePermissions}
                className="bg-accent text-white px-5 py-2 rounded-xl hover:bg-secondary"
              >
                Save Permissions
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccessControl;
