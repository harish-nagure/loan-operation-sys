import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { savePermissionsApi, fetchAllMenus, getMenusWithPermissions } from "../api_service";

import DashboardSidebar from "./DashboardSidebar";
import DashboardHead from "./DashboardHead";

import { FaEdit, FaTrash } from "react-icons/fa";

const AccessControl = () => {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const [menuList, setMenuList] = useState([]);
  const [expandedMenus, setExpandedMenus] = useState({});

  useEffect(() => {
    const getMenus = async () => {
      try {
        // const data = await fetchAllMenus();
        const data = await getMenusWithPermissions(roleId);
        console.log("Menus with permissions:", data);

        const enrichMenus = (menus) =>
          menus.map((menu) => ({
            id: menu.menuId,
            icon: menu.icon,
            name: menu.menuName,
            read: menu.canRead || false,
            write: menu.canWrite || false,
            all: menu.canAll || false,
            children: menu.subMenus?.length ? enrichMenus(menu.subMenus) : [],
          }));

        const enrichedMenus = enrichMenus(data || []);
        setMenuList(enrichedMenus);
      } catch (err) {
        console.error("Failed to load menus:", err);
        alert("Error loading menus");
      }
    };

    getMenus();
  }, [roleId]);

  const toggleExpand = (id) => {
    setExpandedMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePermissionChange = (id, type) => {
    const updatePermissions = (item) => {
      const updated = { ...item };
      if (type === "read") {
        updated.read = !updated.read;
        if (!updated.read) {
          updated.write = false;
          updated.all = false;
        }
      } else if (type === "write") {
        updated.write = !updated.write;
        if (updated.write) {
          updated.read = true;
          updated.all = true;
        } else {
          updated.all = false;
        }
      } else if (type === "all") {
        updated.all = !updated.all;
        updated.read = updated.all;
        updated.write = updated.all;
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

  const flattenMenus = (menus) => {
    let flat = [];
    menus.forEach((menu) => {
      const { children, ...rest } = menu;
      flat.push(rest);
      if (children?.length) flat = flat.concat(flattenMenus(children));
    });
    return flat;
  };

  const handleSavePermissions = async () => {
    try {
      const flatMenus = flattenMenus(menuList);

      const formattedData = flatMenus.map((menu) => ({
        roleId: parseInt(roleId),
        menuId: parseInt(menu.id),
        canRead: menu.read || false,
        canWrite: menu.write || false,
        canAll: menu.all || false,
      }));

      console.log("DATA:\n" + JSON.stringify(formattedData, null, 2));

      const result = await savePermissionsApi(formattedData);

      console.log(result);
      alert(result.message || "Permissions saved successfully");

      // sessionStorage.setItem("menus", JSON.stringify(flatMenus));

      // setMenuList()
    } catch (error) {
      console.error("Error saving permissions:", error.message);
      alert("Failed to save permissions");
    }
  };

  const editMenu = (menu) => {
    navigate("/menu_creation");
  };

  const renderMenuRow = (menu, level = 0, isChild = false) => {
    const hasChildren = menu.children?.length > 0;
    const isExpanded = expandedMenus[menu.id];

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
                <span className="mr-2 text-accent">{isExpanded ? "▼" : "▶"}</span>
              ) : (
                <span className="inline-block w-4 mr-2" />
              )}
              {isChild && (
                <span className="text-gray-400 mr-1 select-none">└──</span>
              )}
              <span className="text-xl mr-2">📁</span>
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
            <button
              onClick={() => alert(`Delete not implemented for ${menu.name}`)}
              className="text-red-500 hover:underline text-sm"
            >
              <FaTrash />
            </button>
          </td>
        </tr>

        {hasChildren &&
          isExpanded &&
          menu.children.map((child) => renderMenuRow(child, level + 1, true))}
      </React.Fragment>
    );
  };

  return (
    
        <div className="min-h-screen bg-gray-100 pr-8 py-8 m-0">
          <div className="bg-white rounded-2xl shadow-lg max-w-5xl mx-auto p-8">
            <h2 className="text-2xl font-bold text-accent mb-6">
              Access Control Management
            </h2>

            <table className="w-full border border-gray-300 rounded-xl overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left">Menu Name</th>
                  <th className="p-3 text-center">Read</th>
                  <th className="p-3 text-center">Write</th>
                  <th className="p-3 text-center">All</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {menuList.length > 0 ? (
                  menuList.map((menu) => renderMenuRow(menu))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-5 text-center text-gray-500">
                      No menus found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleSavePermissions}
                className="bg-accent text-white px-5 py-2 rounded-xl hover:bg-secondary"
              >
                Save Permissions
              </button>
            </div>
          </div>
        </div>
  );
};

export default AccessControl;
