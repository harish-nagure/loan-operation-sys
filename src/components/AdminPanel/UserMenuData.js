import React, { useState,useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import UserMenuForm from "./UserMenuForm";

import { getAllUsers,addUserApi, getRoles } from "../api_service"; // Adjust the import path as needed

// import { fetchRoles } from "../api_service";

const UserMenuData = () => {
  
  
  const location = useLocation(); 
  const { canRead = false, canWrite = false } = location.state || {};



  const [roles, setRoles] = useState([]);
  const [userData, setUserData] = useState([])

  const [editingUser, setEditingUser] = useState(null);


    // useEffect(() => {
    //   const loadRoles = async () => {
    //     try {
    //       const data = await fetchRoles();
    //       console.log('Fetched roles:', data);
    //       if (!Array.isArray(data)) {
    //         throw new Error('Invalid data format received from API');
    //       }
    //       setUserData(data); 
    //     } catch (error) {
    //       console.error('Error fetching roles:', error);
    //     }
    //   };

    //   loadRoles();
    // }, []);



      useEffect(() => {
        
        const fetchAllUsers = async () => {
          try {
            const data_json = await getAllUsers();
            const users = data_json?.data;
            console.log("Fetched users:", users);
            // const sortedUsers = users.sort((a, b) => a.id - b.id);
            setUserData(users);
            console.log("User data set successfully:", users.isActive);
          } catch (error) {
            console.error("Error fetching users:", error.message);
          }
        };

        fetchAllUsers();

            
        
      }, []);

  

  useEffect(() => {
 const fetchRoles = async () => {
        try {
            const response = await getRoles();
            console.log(response);
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
  const handleDelete = (userId) => {
    if (!canWrite) {
      alert("You don't have permission to delete users.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUserData(userData.filter(user => user.id !== userId));
    }
  };

  const handleAddUser = () => {
    if (!canWrite) {
      alert("You don't have permission to add users.");
      return;
    }
    setEditingUser({});
  };


  // const handleFormSubmit = (formUser) => {
  //   if (formUser.id) {
     
  //     setUserData(userData.map(user => (user.id === formUser.id ? formUser : user)));
  //   } else {
  //     // Add mode
  //     const newUser = { ...formUser, id: Date.now() };
  //     setUserData([...userData, newUser]);
  //   }
  //   setEditingUser(null); 
  // };

  const handleFormSubmit = async (formUser) => {
    if (!canWrite) {
      alert("You don't have permission to submit the form.");
      return;
    }
  try {
    if (formUser.id) {
      // Edit mode (local update for now)
      setUserData(userData.map(user => (user.id === formUser.id ? formUser : user)));
    } else {

      const matchedRole = roles.find(
      (r)=> r.roleName?.toLowerCase() === formUser.role?.toLowerCase()
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
        createdBy: "admin",
        phone: formUser.phone,
      };

      console.log(roles,UserInfo);
      const response = await addUserApi(UserInfo);
      alert("User created: " + response.data.userId);

      const data_json = await getAllUsers();
      const users = data_json?.data;
      setUserData(users);
    }
    setEditingUser(null);
  } catch (error) {
    alert("Failed to submit form: " + error.message);
  }
};

  return (
    
        <div className="pr-8 py-8">
          {editingUser ? (
            <UserMenuForm
              initialData={editingUser}
              onSubmit={handleFormSubmit}
              onCancel={() => setEditingUser(null)}
              roles= {roles}
            />
          ) : (
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">User Summary</h2>
                <button
                  onClick={handleAddUser}
                  className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded hover:bg-secondary transition"
                >
                  <FaPlus /> Add User
                </button>
              </div>

              <div className="overflow-auto max-h-[550px] scrollbar-thin">
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
                        <td className="py-2 px-4" title={user.email}>{user.email}</td>
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
                            onClick={() => handleDelete(user.id)}
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
