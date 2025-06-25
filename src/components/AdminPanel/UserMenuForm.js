import React, { useState, useEffect } from "react";



const UserMenuForm = ({ initialData = null, onSubmit, onCancel,roles=[] }) => {
  
  const isEditMode = Boolean(initialData && initialData.id);
  
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    role: "",
    email: "",
    phone: "",
    userState: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstname: initialData.firstName || "",
        lastname: initialData.lastName || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        role: initialData.role?.roleName.toLowerCase() || "",
        userState: initialData.active || false,
      });
    }


  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.firstname.trim()) {
      validationErrors.firstname = "First name is required.";
    }

    if (!formData.lastname.trim()) {
      validationErrors.lastname = "Last name is required.";
    }

    if (!formData.phone.trim()) {
      validationErrors.phone = "Phone number is required."; 
    } else if (!/^\d{10}$/.test(formData.phone)) {
      validationErrors.phone = "Enter a valid 10-digit phone number.";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = "Enter a valid email.";
    }

    if (!formData.role) {
      validationErrors.role = "Role is required.";
    }

    setErrors(validationErrors);






    
    if (Object.keys(validationErrors).length === 0) {
      
      const payload = {
        ...initialData,
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        role: formData.role,
        phone: formData.phone,
        isActive: formData.userState,
      };
      
      onSubmit(payload);
    }
  };



  return (

        <div className="flex items-center justify-center px-6">
          <div className="bg-white shadow-md rounded-xl p-6 w-full">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
              
              {isEditMode ? "Update User" : "Add User"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  value={formData.firstname}
                  onChange={handleChange}
                  className={`mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent ${errors.firstname ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.firstname && <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>}
              </div>

              <div>
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>  
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  value={formData.lastname}
                  onChange={handleChange}
                  className={`mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent ${errors.lastname ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.lastname && <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select a role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.roleName?.toLowerCase()}>
                      {role.roleName}
                    </option>
                  ))}
                </select>
                {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
              </div>


              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700"> 
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div className="flex items-center ">
                <input
                  id="userState"
                  name="userState"
                  type="checkbox"
                  checked={formData.userState}
                  onChange={handleChange}
                  className="h-4 w-4 text-accent accent-accent focus:ring-accent border-gray-300 rounded"
                />
                <label htmlFor="userState" className="ml-2 block text-sm text-gray-700">
                  Active User
                </label>
              </div>

              <div className="flex gap-4">
            <button
              type="submit"
              className="w-full bg-accent text-white py-2 px-4 rounded hover:bg-secondary transition"
            >
              {isEditMode ? "Update User" : "Add User"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition"
            >
              Back
            </button>
          </div>
            </form>
          </div>
        </div>
    
  );
};

export default UserMenuForm;
