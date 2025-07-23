import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMenusWithPermissions } from "../api_service";
import { IoSearch } from "react-icons/io5";

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

const SidebarItem = ({
  icon: Icon,
  label,
  path,
  canRead,
  canWrite,
  isOpen,
  isSelected,
  onToggle,
  onSelect,
  children = [],
}) => {
  const navigate = useNavigate();
  const hasChildren = children.length > 0;

  const handleNavigate = () => {
    if (!hasChildren && (canRead || canWrite)) {
      navigate(path[0], { state: { canRead, canWrite } });
    }
    if (hasChildren){
      onToggle();
    }else{
      onToggle(0);
    }
    onSelect();
  };

  return (
    <>
      <li
        className={`flex items-center justify-between px-6 py-3 rounded-l-full cursor-pointer transition ${
          isSelected || isOpen
            ? "bg-accent text-white font-semibold shadow-lg"
            : "text-gray-600 font-medium hover:bg-blue-50 hover:text-accent"
        }`}
        onClick={handleNavigate}
        title={label}
      >
        <div className="flex items-center gap-3">
          <Icon className="text-lg" />
          <span>{label}</span>
        </div>
        {hasChildren && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className={`text-sm ${isSelected ? "text-white" : "text-accent"} cursor-pointer`}
          >
            {isOpen ? "▲" : "▼"}
          </span>
        )}
      </li>

      {isOpen && hasChildren && (
        <ul className="ml-10 mt-1 space-y-1 text-sm text-gray-700">
          {children.map((child, index) => (
            <li
              key={index}
              className="cursor-pointer px-3 py-2 rounded-md text-gray-600 font-medium hover:bg-blue-50 hover:text-accent transition-colors"
              onClick={() =>
                (child.canRead || child.canWrite) &&
                navigate(child.path, {
                  state: {
                    canRead: child.canRead,
                    canWrite: child.canWrite,
                  },
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
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedMenuId, setSelectedMenuId] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMenus = async () => {
      try {
        const roleId = sessionStorage.getItem("roleId");
        const user = sessionStorage.getItem("username");
        setUsername(user || "");

        const data = await getMenusWithPermissions(roleId);

        const filterMenus = (menus) =>
          menus
            .filter(
              (menu) =>
                (menu.canRead || menu.canWrite) &&
                menu.type?.toLowerCase() !== "sub_form"
            )
            .map((menu) => ({
              ...menu,
              subMenus: filterMenus(menu.subMenus || []),
            }));

        const filtered = filterMenus(data);
        setMenuItems(filtered);

        // Restore from localStorage
        const savedOpenId = Number(sessionStorage.getItem("openMenuId"));
        const savedSelectedId = Number(sessionStorage.getItem("selectedMenuId"));

        const menuIds = filtered.map((m) => m.menuId);
        if (savedOpenId && menuIds.includes(savedOpenId)) {
          setOpenMenuId(savedOpenId);
        }
        if (savedSelectedId && menuIds.includes(savedSelectedId)) {
          setSelectedMenuId(savedSelectedId);
        }

        // Optional: Auto navigate to selected menu
          // const selectedMenu = filtered.find((m) => m.menuId === savedSelectedId);
          // if (selectedMenu && selectedMenu.url) {
          //   navigate(selectedMenu.url, {
          //     state: {
          //       canRead: selectedMenu.canRead,
          //       canWrite: selectedMenu.canWrite,
          //     },
          //   });
          // }

      } catch (err) {
        console.error("Failed to fetch menus", err);
      }
    };

    loadMenus();
  }, [navigate]);

  return (
    <aside className="w-72 bg-primary/20 h-screen flex flex-col">
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

      <ul className="space-y-1 pl-5 overflow-y-auto h-full custom-scrollbar direction-ltr">
        {menuItems.map((item) => {
          const subUrls = item.subMenus?.map((sub) => sub.url) || [];
          const allPaths = [item.url, ...subUrls];

          return (
            <SidebarItem
              key={item.menuId}
              icon={getIconByName(item.icon)}
              label={item.menuName}
              path={allPaths}
              canRead={item.canRead}
              canWrite={item.canWrite}
              isOpen={openMenuId === item.menuId}
              isSelected={selectedMenuId === item.menuId}
              onToggle={() => {
                const newOpenId = openMenuId === item.menuId ? null : item.menuId;
                setOpenMenuId(newOpenId);
                sessionStorage.setItem("openMenuId", String(newOpenId || ""));
              }}
              onSelect={() => {
                setSelectedMenuId(item.menuId);
                sessionStorage.setItem("selectedMenuId", String(item.menuId));
              }}
              children={
                item.subMenus?.map((sub) => ({
                  label: sub.menuName,
                  path: sub.url,
                  icon: sub.icon,
                  canRead: sub.canRead,
                  canWrite: sub.canWrite,
                })) || []
              }
            />
          );
        })}
      </ul>
    </aside>
  );
};

export default DashboardSidebar;
