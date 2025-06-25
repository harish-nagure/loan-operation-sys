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
    
       
  <div className="bg-gray-100 px-12 pt-10">
    <div className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full mx-auto p-20 min-h-[600px]">
      <h2 className="text-5xl font-bold text-[#029aaa] mb-12 text-center">
        Select Role
      </h2>

      <div className="mb-10 py-20 flex items-center gap-10">
        <label htmlFor="roleSelect" className="font-semibold text-gray-700 text-2xl">
          Role Access:
        </label>
        <select
          id="roleSelect"
          value={currentUserRole}
          onChange={(e) => setCurrentUserRole(e.target.value)}
          className="border rounded-xl px-6 py-3 text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="bg-[#029aaa] text-white text-xl px-10 py-4 rounded-3xl hover:bg-[#01c4d5] transition"
        >
          Continue
        </button>
      </div>
    </div>
  </div>



  );
};

export default AccessControlSetup;
