import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import DashboardSidebar from './DashboardSidebar';
import DashboardHead from './DashboardHead';
import AdminUserForm from './AdminUserForm';
import { useLocation } from 'react-router-dom';


import { createRole,getRoles,updateRole, deleteRole, getAllUsers } from '../api_service'; 

const AdminUserPanel = ({ canRead = false, canWrite = false }) => {

  const [adminList, setAdminList] = useState([]);

  const [formVisible, setFormVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    roleName: '',
    description: '',
  });



  useEffect(() => {
    
    const fetchRoles = async () => {
      try {
        const data_json = await getRoles();
        const roles = data_json?.data;
        console.log("Fetched roles HIi:", roles);
        // const sortedRoles = roles.sort((a, b) => a.id - b.id);
        
        setAdminList(roles);
      } catch (error) {
        console.error("Error fetching roles:", error.message);
      }
    };

    fetchRoles();
  }, []);



  const handleFormSubmit = async () => {

    if (!canWrite) {
      alert("You don't have permission to submit the form.");
      return;
    }
    const errors = [];

    if (!formData.roleName.trim()) errors.push("Role Name is required.");
    if (!formData.description.trim()) errors.push("Description is required.");

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    try {

      if (editId) {
        
        const updatedRole = await updateRole(editId, formData);
        setAdminList(prev =>
          prev.map(admin => (admin.id === editId ? { ...updatedRole } : admin))
        );
      } else {
        const createdRole = await createRole(formData);
        setAdminList(prev => [...prev, { ...createdRole }]);
      }
      alert(editId ? "Role updated successfully!" : "Role created successfully!");
      resetForm();
      setFormVisible(false);
    } catch (error) {
      console.error("Error creating role:", error.message);
      alert("Failed to create role: " + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      roleName: '',
      description: ''
    });
    setEditId(null);
  };

  const handleEdit = (admin) => {
    if (!canWrite) {
      alert("You don't have permission to edit users.");
      return;
    }
    setFormData(admin);
    setEditId(admin.id);
    setFormVisible(true);
  };

const handleDelete = async (id) => {

  if (!canWrite) {
      alert("You don't have permission to delete users.");
      return;
    }
  if (window.confirm('Are you sure to delete this role?')) {
    try {
      await deleteRole(id);
      setAdminList(prev => prev.filter(admin => admin.id !== id));
      alert('Role deleted successfully!');
    } catch (error) {
      console.error('Error deleting role:', error.message);
      alert('Failed to delete role: ' + error.message);
    }
  }
};


  return (
    // <div className="lg:flex md:block font-inter">
    //   <div className="h-screen hidden lg:block fixed z-20">
    //     <DashboardSidebar />
    //   </div>
    //   <main className="flex-1 lg:ml-72">
    //     <DashboardHead />
        <div className="pr-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-700">Users Roles</h2>
            <button
              disabled={!canWrite}
              onClick={() => {
                if (!canWrite) {
                  alert("You don't have permission to add users.");
                  return;
                }
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
                    {/* <th className="py-2 px-4">ID</th> */}
                    <th className="py-2 px-4">Role</th>
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
                      {/* <td className="py-2 px-4">{admin.id}</td> */}
                      <td className="py-2 px-4">{admin.roleName}</td>
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
    //   </main>
    // </div>
  );
};

export default AdminUserPanel;
