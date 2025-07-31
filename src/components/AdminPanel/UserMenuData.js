import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import UserMenuForm from "./UserMenuForm";
import {
  getAllUsers,
  addUserApi,
  getRoles,
  deleteUserDeatils,
  updateUserDeatils,
} from "../api_service";

const UserMenuData = () => {
  const location = useLocation();
  const { canRead = false, canWrite = false } = location.state || {};

  const [roles, setRoles] = useState([]);
  const [userData, setUserData] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllUsers = async () => {
      setLoading(true);
      try {
        const data_json = await getAllUsers();
        const users = data_json?.data;
        const sortedUsers = users.sort((a, b) => a.id - b.id);
        setUserData(sortedUsers);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getRoles();
        setRoles(response?.data);
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const handleEdit = (user) => {
    if (!canWrite) {
      alert("You don't have permission to edit users.");
      return;
    }
    setEditingUser(user);
  };

  const handleDelete = async (userId) => {
    if (!canWrite) {
      alert("You don't have permission to delete users.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUserData(userData.filter((user) => user.userId !== userId));
      const response = await deleteUserDeatils(userId);
      alert(response?.message);
    }
  };

  const handleAddUser = () => {
    if (!canWrite) {
      alert("You don't have permission to add users.");
      return;
    }
    setEditingUser({});
  };

  const handleFormSubmit = async (formUser) => {
    if (!canWrite) {
      alert("You don't have permission to submit the form.");
      return;
    }

    try {
      const matchedRole = roles.find(
        (r) => r.roleName?.toLowerCase() === formUser.role?.toLowerCase()
      );

      if (!matchedRole) {
        alert("Invalid role selected");
        return;
      }

      const UserInfo = {
        email: formUser.email,
        firstName: formUser.firstname,
        lastName: formUser.lastname,
        roleId: matchedRole.id,
        createdBy: matchedRole.roleName,
        phone: formUser.phone,
        active: formUser.active,
      };

      setLoading(true);

      if (formUser.userId) {
        const response = await updateUserDeatils(formUser.userId, UserInfo);
        alert(response?.message || "User updated");
      } else {
        const response = await addUserApi(UserInfo);
        alert("User created: " + response?.data?.userId);
      }

      const data_json = await getAllUsers();
      const users = data_json?.data;
      setUserData(users);
      setEditingUser(null);
    } catch (error) {
      alert("Failed to submit form: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Full-screen loading spinner
  if (loading) {
    return (
      <div className="absolute inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-white border-t-[#029aaa] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="pr-8 pt-6 pb-4">
      {editingUser ? (
        <UserMenuForm
          initialData={editingUser}
          onSubmit={handleFormSubmit}
          onCancel={() => setEditingUser(null)}
          roles={roles}
        />
      ) : (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-accent">User Summary</h2>
            <button
              onClick={handleAddUser}
              className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded hover:bg-secondary transition"
            >
              <FaPlus /> Add User
            </button>
          </div>

          <div className="overflow-auto max-h-[550px] custom-scrollbar">
            <table className="min-w-full text-sm text-left">
              <thead className="sticky top-0 bg-gray-100 border-b">
                <tr>
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">First Name</th>
                  <th className="py-2 px-4">Last Name</th>
                  <th className="py-2 px-4">Role</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Phone</th>
                  <th className="py-2 px-4">Active</th>
                  <th className="py-2 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{user.userId}</td>
                    <td className="py-2 px-4">{user.firstName}</td>
                    <td className="py-2 px-4">{user.lastName}</td>
                    <td className="py-2 px-4 capitalize">{user.role?.roleName}</td>
                    <td className="py-2 px-4" title={user.email}>
                      {user.email}
                    </td>
                    <td className="py-2 px-4">{user.phone}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          user.active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                        title={user.active ? "User is active" : "User is inactive"}
                      >
                        {user.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-center space-x-4">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-accent hover:text-secondary"
                        title="Edit User"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(user.userId)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete User"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenuData;
