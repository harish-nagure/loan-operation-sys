import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const UserSummary = () => {
  const navigate = useNavigate();

  const userData = [
    { id: 1, name: "Arjun Mehta", role: "admin", email: "arjun.mehta@example.com", isActive: true },
    { id: 2, name: "Neha Kapoor", role: "editor", email: "neha.k@example.com", isActive: false },
    { id: 3, name: "Rahul Verma", role: "user", email: "rahul.v@example.com", isActive: true },
    { id: 4, name: "Simran Sinha", role: "moderator", email: "simran.sinha@example.com", isActive: false },
    { id: 5, name: "Yash Patel", role: "user", email: "yash.patel@example.com", isActive: true },
  ];

  const handleEdit = (user) => {
    navigate("/editUser", { state: user });
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      console.log("Deleted user with ID:", userId);
    }
  };

  const handleAddUser = () => {
    navigate("/addUser");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">User Summary</h2>
        <button
          onClick={handleAddUser}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <FaPlus /> Add User
        </button>
      </div>

      <div className="overflow-auto max-h-[450px] scrollbar-thin">
        <table className="min-w-full text-sm text-left">
          <thead className="sticky top-0 bg-gray-100 border-b">
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Active</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4 capitalize">{user.role}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-2 px-4 text-center space-x-4">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-800"
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
  );
};

export default UserSummary;
