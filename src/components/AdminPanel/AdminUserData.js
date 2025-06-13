import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import DashboardSidebar from './DashboardSidebar';
import DashboardHead from './DashboardHead';
import AdminUserForm from './AdminUserForm';


import { createRole } from '../api_service'; 

const AdminUserPanel = () => {


  const [adminList, setAdminList] = useState([
    {
      id: 1,
      firstName: "Arjun",
      lastName: "Mehta",
      roleName: "Super Admin",
      phone : "9876543210",
      description: "Full system access"

    },
    {
      id: 2,
      firstName: "Neha",
      lastName: "Kapoor",
      roleName: "Editor",
      phone : "9123456780",
      description: "Can edit content",
    },
  ]);

  const [formVisible, setFormVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({

    firstName: '',
    lastName: '', 
    roleName: '',
    phone: '',
    description: '',
  });

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      roleName: '',
      phone: '',
      description: ''
    });
    setEditId(null);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (editId) {
  //     setAdminList((prev) =>
  //       prev.map((admin) => (admin.id === editId ? { ...formData, id: editId } : admin))
  //     );
  //   } else {
  //     setAdminList((prev) => [...prev, { id: Date.now(), ...formData }]);
  //   }
  //   resetForm();
  //   setFormVisible(false);
  // };

// const handleFormSubmit = async () => {


//     if (formData.firstName.trim() === '' || formData.lastName.trim() === '') {
//       setError('First Name and Last Name are required');
//     }
//     if (formData.roleName.trim() === '') {
//       setError('Role Name is required');
//     }

//     if (formData.phone.trim() === '') {
//       setError('Phone number is required');
//     }

//     try {
//       console.log('Form data:', formData);

      
//       if (!formData.roleName || !formData.description) {
//         alert('Role Name and Description are required');
//         return;}
//       const createdRole = await createRole({
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         roleName: formData.roleName,
//         phone: formData.phone,
//         description: formData.description,
//       });
//       setAdminList((prev) => [...prev, { ...createdRole }]);
//       resetForm();
//       setFormVisible(false);


//     } catch (error) {
//       console.error('Error creating role:', error.message);
//       alert('Failed to create role: ' + error.message);
//   }
// };

const handleFormSubmit = async () => {
  const errors = [];

  if (!formData.firstName.trim()) errors.push("First Name is required.");
  if (!formData.lastName.trim()) errors.push("Last Name is required.");
  if (!formData.roleName.trim()) errors.push("Role Name is required.");
  if (!formData.phone.trim()) {
    errors.push("Phone number is required.");
  } else if (!/^\d{10}$/.test(formData.phone)) {
    errors.push("Phone number must be 10 digits.");
  }
  if (!formData.description.trim()) errors.push("Description is required.");

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }

  try {
    const createdRole = await createRole(formData);

    if (editId) {
      setAdminList(prev =>
        prev.map(admin => (admin.id === editId ? { ...formData, id: editId } : admin))
      );
    } else {
      setAdminList(prev => [...prev, { ...createdRole }]);
    }

    resetForm();
    setFormVisible(false);
  } catch (error) {
    console.error("Error creating role:", error.message);
    alert("Failed to create role: " + error.message);
  }
};

//   const handleSubmit = async (formUser) => {
//   if (formUser.id) {
//     // Edit existing user locally
//     setUserData(userData.map(user => (user.id === formUser.id ? formUser : user)));
//     setEditingUser(null);
//   } else {
//     // Add new user and send to backend
//     try {
//       const newUser = {
//         name: formUser.name || formUser.username,
//         email: formUser.email,
//         role: formUser.role,
//         isActive: formUser.isActive || formUser.userState,
//       };

//       const createdUser = await createUser(newUser);
//       setUserData([...userData, createdUser]);
//       setEditingUser(null);
//     } catch (error) {
//       console.error("Error creating user:", error.message);
//       alert("Failed to create user.");
//     }
//   }
// };

  const handleEdit = (admin) => {
    setFormData(admin);
    setEditId(admin.id);
    setFormVisible(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure to delete this role?')) {
      setAdminList((prev) => prev.filter((admin) => admin.id !== id));
    }
  };

  return (
    <div className="lg:flex md:block font-inter">
      <div className="h-screen hidden lg:block fixed z-20">
        <DashboardSidebar />
      </div>
      <main className="flex-1 lg:ml-72">
        <DashboardHead />
        <div className="p-6 ">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-700">Users Roles</h2>
            <button
              onClick={() => {
                resetForm();
                setFormVisible(true);
              }}
              className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded hover:bg-secondary transition"
            >
              <FaPlus /> Add Roles
            </button>
          </div>
          <div className="flex justify-center items-center mb-6">
            {formVisible && (
                <AdminUserForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleFormSubmit}
                onCancel={() => {
                    resetForm();
                    setFormVisible(false);
                }}
                />
            )}
          </div>

          {!formVisible && (
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 border-b text-gray-700">
                  <tr>
                    <th className="py-2 px-4">First Name</th>
                    <th className="py-2 px-4">Last Name</th>
                    <th className="py-2 px-4">Role</th>
                    <th className="py-2 px-4">Phone</th>
                    <th className="py-2 px-4">Description</th>
                    {/* {Object.entries(formData.permissions).map(([perm]) => (
                      <th key={perm} className="py-2 px-4">
                        {perm.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      </th>
                    ))} */}
                    <th className="py-2 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                {adminList.map((admin) => (
                    <tr key={admin.id} className="border-b hover:bg-gray-50 text-base">
                      <td className="py-2 px-4 font-medium">{admin.firstName}</td>
                      <td className="py-2 px-4">{admin.lastName}</td>
                      <td className="py-2 px-4">{admin.roleName}</td>
                      <td className="py-2 px-4">{admin.phone}</td>
                      <td className="py-2 px-4">{admin.description}</td>


                    {/* {Object.entries(admin.permissions).map(([perm, value]) => (

                        <td key={perm} className="py-2 px-4">
                        <span className={`flex justify-center px-2 py-1 text-center align-middle rounded ${value ? 'text-lg text-green-800' : 'text-lg text-red-800'}`}>
                            {value ? <FaCheckSquare /> : <FaTimesCircle />}
                        </span>
                        </td>
                    ))} */}

                    <td className="py-2 px-4 text-center space-x-3">
                        <button
                        className="text-accent hover:text-secondary"
                        onClick={() => handleEdit(admin)}
                        >
                        <FaEdit />
                        </button>
                        <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(admin.id)}
                        >
                        <FaTrash />
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminUserPanel;
