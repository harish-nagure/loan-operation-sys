import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getMenusWithPermissions, getRoles } from "../api_service";
import { IoSearch } from "react-icons/io5";

// All icons
import * as MdIcons from "react-icons/md";
import * as PiIcons from "react-icons/pi";
import * as HiIcons from "react-icons/hi2";
import * as IoIcons from "react-icons/io5";

const allIcons = {
  ...MdIcons,
  ...PiIcons,
  ...HiIcons,
  ...IoIcons,
};

const getIconByName = (iconName) => {
  return allIcons[iconName] || MdIcons.MdOutlineAnalytics;
};

const SidebarItem = ({ icon: Icon, label, path, canRead, canWrite, children = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = path.includes(location.pathname);
  const hasChildren = children.length > 0;
  const isChildActive = hasChildren && children.some(child => location.pathname === child.path);

  const handleClick = () => {
    if (hasChildren) {
      setOpen(!open);
    } else if (canRead || canWrite) {
      navigate(path[0], {
        state: { canRead, canWrite },
      });
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
        title={label}
      >
        <div className="flex items-center gap-3">
          <Icon className="text-lg" />
          <span>{label}</span>
        </div>
        {hasChildren && (
          <span className={`${isActive || isChildActive ? "text-white" : "text-accent"}`}>
            {open ? "▲" : "▼"}
          </span>
        )}
      </li>

      {open && hasChildren && (
        <ul className="ml-10 mt-1 space-y-1 text-sm text-gray-700">
          {children.map((child, index) => (
            <li
              key={index}
              className={`cursor-pointer px-3 py-2 rounded-md transition-colors duration-150 ${
                location.pathname === child.path
                  ? "bg-blue-100 text-accent font-medium"
                  : "text-gray-600 font-medium hover:bg-blue-50 hover:text-accent"
              }`}
              onClick={() =>
                (child.canRead || child.canWrite) &&
                navigate(child.path, {
                  state: { canRead: child.canRead, canWrite: child.canWrite },
                })
              }
              title={child.label}
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
  const [menuItems, setMenuItems] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loadMenus = async () => {
      try {
        const role = sessionStorage.getItem("role");
        const roles = await getRoles();

        const matchedRole = roles.data.find(
          r => r.roleName?.toLowerCase() === role?.toLowerCase()
        );
        if (!matchedRole) {
          console.error("Role not found in fetched roles.");
          return;
        }

        const roleId = matchedRole.id;
        const data = await getMenusWithPermissions(roleId);

        const filterMenus = (menus) =>
          menus
            .filter(menu => menu.canRead || menu.canWrite)
            .map(menu => ({
              ...menu,
              subMenus: (menu.subMenus || []).filter(sub => sub.canRead || sub.canWrite),
            }));

        setMenuItems(filterMenus(data));
      } catch (err) {
        console.error("Failed to fetch menus with permissions", err);
      }
    };

    loadMenus();
  }, []);

  return (
    <aside className="w-72 bg-white h-screen flex flex-col">
      <div className="px-4 py-6">
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

      <ul className="space-y-1 pl-5 overflow-y-auto h-full custom-scrollbar direction-rtl">
        <div className="direction-ltr">
          {menuItems.map(item => (
            <SidebarItem
              key={item.menuId}
              icon={getIconByName(item.icon)}
              label={item.menuName}
              path={[item.url]}
              canRead={item.canRead}
              canWrite={item.canWrite}
              children={
                item.subMenus?.map(sub => ({
                  label: sub.menuName,
                  path: sub.url,
                  canRead: sub.canRead,
                  canWrite: sub.canWrite,
                })) || []
              }
            />
          ))}
        </div>
      </ul>
    </aside>
  );
};

export default DashboardSidebar;
