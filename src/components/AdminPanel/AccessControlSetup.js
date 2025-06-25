import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHead from "./DashboardHead";
import { getRoles  } from "../api_service";

const AccessControlSetup = () => {
  const [roles, setRoles] = useState([]);
  const [currentUserRole, setCurrentUserRole] = useState("");
  const navigate = useNavigate();
  

    useEffect(() => {
      
      const fetchRoles = async () => {
        try {
          const data_json = await getRoles();
          const roles = data_json?.data;
          console.log("Fetched roles SET up:", roles);

          setRoles(roles);
          if (roles.length > 0) {
            setCurrentUserRole(roles[0].id); 
          }
         
        } catch (error) {
          console.error("Error fetching roles:", error.message);
        }
      };
  
      fetchRoles();
    }, []);



  const handleContinue = () => {
    navigate(`/access_control/${currentUserRole}`);
  };

  return (
    
        <div className="min-h-screen bg-gray-100 pr-8 py-20">
          <div className="bg-white rounded-2xl shadow-lg max-w-2xl mx-auto p-8">
            <h2 className="text-2xl font-bold text-accent mb-6">
              Select Role 
            </h2>
            <div className="mb-6 flex items-center gap-4">
              <label htmlFor="roleSelect" className="font-semibold text-gray-700">
                Role Access:
              </label>
              <select
                id="roleSelect"
                value={currentUserRole}
                onChange={(e) => setCurrentUserRole(e.target.value)}
                className="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.roleName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleContinue}
                className="bg-accent text-white px-5 py-2 rounded-xl hover:bg-secondary"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
     
  );
};

export default AccessControlSetup;
