import { data } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;



export async function SendOTP({ username, password }) {
  // console.log('Logging in user:', { username, password, processEnv: process.env.REACT_APP_API_URL });
  const response = await fetch(`${process.env.REACT_APP_API_URL}/send-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }
  const data_json = await response.json();
  // const data = data_json?.data;
  return data_json;
}

export async function VerifyOTP({ email, otp }) {

  console.log('Logging in user:', { email, otp, processEnv: process.env.REACT_APP_API_URL });
  const response = await fetch(`${process.env.REACT_APP_API_URL}/verify-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, otp }),
  });

  

  const data_json = await response.json();
  if (!response.ok) {
    // const errorData = await response.json();
    throw new Error(data_json.message || 'Login failed');
  }
  const data = data_json?.data;
  console.log('OTP verification response:', data);
  console.log('Login response data:', data);
  if (data.token) {
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('username', data.userId);
    sessionStorage.setItem('role', data.role);
    sessionStorage.setItem('roleId',data.roleId);
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('refreshToken', data.refreshToken);
    sessionStorage.setItem('loginTime', new Date().getTime());
  } else {
    throw new Error('Token not found in response');
  }
  return data;
}

export async function createAccountApi(UserDetails){
  try{  
  const response = await fetch(`${process.env.REACT_APP_API_URL}/create-account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(UserDetails),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to create account");
  }
  return data;

  }catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

export async function forgetPassword(userID) {
  try {
    console.log(userID);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/forget-password`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userID),
    });
    
    const data = await response.json();
    console.log("forgetPassword response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to send OTP");
    }

    return data;
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    throw error; 
  }
}



export async function resetPassword(resetData) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(resetData),
    });

    if (!response.ok) {
      throw new Error('Password reset failed');
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
}



// "id": 1,
//         "roleName": "Admin",
//         "description": "Adminstrator",
//         "rcreTime": "2025-06-10T15:24:19.30809",
//         "updtTime": null


//ROLE CREATION API
// This function creates a new role in the system.

// To add a new role and its description, using the POST method to the `/roles` endpoint.
export async function createRole({ roleName, description }) {
  console.log('Creating role:', { roleName, description, apiUrl: process.env.REACT_APP_API_URL });

  if (!roleName || !description) {
    throw new Error('Role Name and Description are required');
  }

  const response = await fetch(`${process.env.REACT_APP_API_URL}/roles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify({ roleName, description }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || 'Failed to create role');
  }

  const data_json = await response.json();
  const data = data_json?.data;
  console.log('Role creation response:', data);
  return data;
}

// This fuction is to GET or FETCH all roles from the system.

export async function getRoles() {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/roles`, {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || 'Failed to fetch roles');
  }

  const data_json = await response.json();
  console.log('Fetched roles:', data_json);
  // const data = data_json?.data;
  return data_json;
}

// This function updates an existing role in the system.
export async function updateRole(id, updatedData) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/roles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update role');
  }

  const data_json = await response.json();
  const data = data_json?.data;
  return data;
}


export async function deleteRole(id){
  const response = await fetch(`${API_URL}/roles/${id}`, {
    method:'DELETE',
    headers:{
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify(id),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete role');
  }
  const data_json = await response.json();
  return data_json?.message || 'Role Not Found';
}



// function to create a new user in the system.

// export async function createUser({ firstname, lastname, email, phone, role, isActive }) {
//   const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       // Authorization: `Bearer ${sessionStorage.getItem('token')}`,
//     },
//     body: JSON.stringify({
//       firstName: firstname,
//       lastName: lastname,
//       email,
//       phone,
//       active: isActive,
//       rcreationUser: 'system', // or pass dynamically
//       role: { roleName: role } // assumes backend maps roleName to roleId
//     }),
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'Failed to create user');
//   }

//   const data = await response.json();
//   return data;
// }



export async function getAllUsers() {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || 'Failed to fetch users');
  }

  const data_json = await response.json();
  console.log('Fetched users:', data_json);
  // const data = data_json?.data;
  return data_json;
}


export async function addUserApi(UserInfo) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/register`,{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify(UserInfo),
  });

  const data = await response.json();

  if (!response.ok){
    // const errorData = await response.json();
    throw new Error(data?.message || 'Failed to add user');

  }

  return data;
}




// /delete-userdeatils/USR001

export async function deleteUserDeatils(userId) {
  try{
    const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-userdeatils/${userId}`,{
      method:"DELETE",
      headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      } 
    })

    const data_json = await response.json();

      if(!response.ok){
        console.error(data_json.message);
      }
      
    return data_json;

  }catch(error){
    console.log(error);
    return;
  }
  
}
// update_userdeatils/{userId}

export async function updateUserDeatils(userId,userData) {
  try{
    const response = await fetch(`${process.env.REACT_APP_API_URL}/update_userdeatils/${userId}`,{
      method:"PUT",
      headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify(userData),
    })

    const data_json = await response.json();

      if(!response.ok){
        console.error(data_json.message);
      }
      
    return data_json;

  }catch(error){
    console.log(error);
    return;
  }
}

// Fetch User by ID
// Purpose: Retrieves a user by their userId.

export async function getUserById(userId) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/fetch-user/${userId}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      },
    }
  );

  const data = await response.json();
  if (!response.ok) {
    // const errorData = await response.json();
    console.error(data?.message)
    return;
  }

  return data;
}


export async function validateAndRefreshToken(refreshToken) {

  // alert("Stored refreshToken API called:", refreshToken);
  if (!refreshToken) {
    alert('Refresh token is required');
  }

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Token refresh failed with non-200 response');
    }

    const result = await response.json();

    if (result.status === 200 && result.data) {
      const { token, refreshToken } = result.data;

      sessionStorage.setItem('token', token);
      sessionStorage.setItem('refreshToken', refreshToken);
      sessionStorage.setItem('loginTime', Date.now().toString());
      alert('Token refreshed successfully');
      return token;
    } else {
      throw new Error(result.message || 'Invalid token refresh response');
    }
  } catch (error) {
    console.error('validateAndRefreshToken error:', error);
    throw error;
  }
}


export async function submitApplicationDetails(data) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/add_appdetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to submit application.");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}





export  async function fetchAllMenus(){
  const response = await fetch(`${process.env.REACT_APP_API_URL}/all-menus`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    }
  });

  const data = await response.json();
  // alert(data);
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch menus");
  }
  return data?.data;
};



// export const savePermissionsApi = async (permissions) => {
  
//   const response = await  fetch(`${process.env.REACT_APP_API_URL}/savePermissions`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
//     },
//     body: JSON.stringify(permissions),
//   });

//   const data = await response.json();
//   console.log("Save"+data.message);

//   if (!response.ok) {
//     throw new Error(data.message );
//   }

//   return data;
// };



// this.http.post(`${process.env.REACT_APP_API_URL}/savePermissions`, data, {

//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })

// }).subscribe(response => {

//   console.log(response);

// });
 
export const savePermissionsApi = async (permissions) => {

  const response = await fetch(`${process.env.REACT_APP_API_URL}/savePermissions`, {

    method: "POST",

    headers: {

      "Content-Type": "application/json",

      "Authorization": `Bearer ${sessionStorage.getItem('token')}`,

    },

    body: JSON.stringify(permissions), // keep this as is

  });
 
  const data = await response.json();

  console.log("Save " + data.message);
 
  if (!response.ok) {

    throw new Error(data.message);

  }
 
  return data;

};

 

export  async function getMenusWithPermissions(roleId) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/getMenusWithPermissions/${roleId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    }
  });

  const data_json = await response.json();
  const data = data_json.data;
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch menu permissions");
  }

  return data;
};



//WORKFLOW




export  async function fetchLoanTypes(){
 
  //const apiUrl="http://152.67.189.231:8842/api/auth/loan-types";

   const token = sessionStorage.getItem("token")
  // console.log("🔐 Fetching loan types with token:", token);

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/loan-types`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    // Check for 403 or other auth issues before parsing JSON
    if (response.status === 403) {
      console.error("❌ Forbidden: You are not authorized to access loan types.");
      return { success: false, data: [], message: "Unauthorized access (403)" };
    }

    if (!response.ok) {
      const text = await response.text(); // Try plain text if not JSON
      console.error("❌ API returned error:", response.status, text);
      return { success: false, data: [], message: text || "API error" };
    }

    const result = await response.json();
    console.log("Result",result);

    const fullResponse = {
      status: result.status || response.status,
      message: result.message || "Something went wrong",
      data: result.data || [],
    };

    console.log("📦 API Response (Loan Types):", fullResponse);

    return { success: true, ...fullResponse };
  } catch (error) {
    console.error("❌ Network error while fetching loan types", error);
    return { success: false, data: [], message: "Network error" };
  }
};
// api_service.js
export const saveLoanType = async (loanType, description) => {
  //const apiUrl = "http://152.67.189.231:8842/api/auth/loan-type/save";

  const payload = {
    loanType,
    description,
  };

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/loan-type/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    const fullResponse = {
      status: result.status || response.status,
      message: result.message || "Something went wrong",
      data: result.data || null,
    };

    if (response.ok && result.status === 200) {
      console.log("✅ Response:", fullResponse); // Show full structured response
      return { success: true, ...fullResponse };
    } else {
      console.error("❌ Response:", fullResponse);
      return { success: false, ...fullResponse };
    }
  } catch (error) {
    const errorResponse = {
      status: 0,
      message: "Network error",
      data: null,
    };
    console.error("❌ Response:", errorResponse, error);
    return { success: false, ...errorResponse };
  }
};

export const saveWorkflow = async (loanType, steps) => {
  

  const payload = {
    loanType,
    steps,
  };

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/workflow-save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log("Save Workflow for Loan Type:",result);

    return {
      status: response.status,
      message: result.message || "Unknown response",
      data: result.data ?? null,
    };
  } catch (error) {
    console.error("API Error (saveWorkflow):", error);
    return {
      status: 500,
      message: "Network or server error",
      data: null,
    };
  }
};


export const fetchWorkflowByLoanType = async (loanType) => {
  const token = sessionStorage.getItem("token");

  if (!token || !loanType) {
    return {
      status: 400,
      message: "Missing token or loan type",
      data: null,
    };
  }

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/workflow-get/${loanType}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );



    const text = await response.text();
    const result = text ? JSON.parse(text) : {};


   

    console.log("📦 Workflow Fetch Result:", result);

    return {
      status: response.status,
      message: result.message || "No response message",
      data: result.data || null,
    };
  } catch (error) {
    console.error("❌ API Error (fetchWorkflowByLoanType):", error);
    return {
      status: 500,
      message: "Network or server error",
      data: null,
    };
  }
};

//22


export const saveApplicationDetails = async (requestData) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/add_appdetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to submit application");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};




export const getAllApplicationDetails = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/get_allApplicationDetails`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch application details");
    }

    const data = await response.json();
    return data; 
   
  } catch (error) {
    throw error;
  }
};


export async function getApplicationCount(){
  const response = await fetch(`${process.env.REACT_APP_API_URL}/getapplicationCount`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    },
  });

  
  const data_json = await response.json();

  if(!response.ok){
    console.error(data_json.message);
  }
  
  return data_json;
}




export async function addAccountLinked(requestData){
  const response = await fetch(`${process.env.REACT_APP_API_URL}/addOrUpdate_applicationBankdetails`,{
    method: "POST",
    headers:{
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    },
    body: JSON.stringify(requestData),
  });

  
  const data_json = await response.json();

  if(!response.ok){
    console.error(data_json.message);
  }
  
  return data_json;
  
}

export async function updateLoanType(applicationNumber,lonetype){
    console.log(applicationNumber,lonetype)
  try{      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/update_loantype/${applicationNumber}`,{
        method: "PUT",
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify( lonetype ),
      });
      console.log("Sending token:", sessionStorage.getItem("token"));

      
      const data_json = await response.json();

      if(!response.ok){
        console.error(data_json.message);
      }
      
      return data_json;
  }catch(error){
    console.log(error.message);
    return;
  }
}

export async function addDocumentVerified(formData) {
  console.log(formData);
  try{
      const response = await fetch(`${process.env.REACT_APP_API_URL}/addOrUpdate_Application_documentDeatils`,{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
      body: JSON.stringify(formData),
    });

    
    const data_json = await response.json();

    if(!response.ok){
      console.error(data_json.message);
    }
    
    return data_json;
    
  }catch(error){
    console.log(error.message)
     return {
      status: 500,
      message: "Something went wrong",
    };
  }
  
}

export async function addOrUpdateAcceptOffer(acceptedData) {
  console.log(acceptedData);
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/addOrUpdate_Application_acceptOffer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(acceptedData),
      }
    );

    const data_json = await response.json();

    if (!response.ok) {
      console.error(data_json.message);
    }

    return data_json;

  } catch (error) {
    console.error(error.message);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
}

export async function addOrUpdateReviewAgreement(payload) {
  console.log(payload);
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/addOrUpdate_Application_reviewAgreement`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const data_json = await response.json();

    if (!response.ok) {
      console.error(data_json.message);
    }

    return data_json;

  } catch (error) {
    console.error(error.message);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
}

export async function addOrUpdateFundedInfo(payload) {
  console.log(payload);
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/addOrUpdate_Application_fundedInfo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const data_json = await response.json();

    if (!response.ok) {
      console.error(data_json.message);
    }

    return data_json;

  } catch (error) {
    console.error(error.message);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
}




export const getApplicationDetailsByNumber = async (applicationNumber) => {
  try {
    const response = await fetch(`http://152.67.189.231:8842/api/auth/getApplicationDetails/${applicationNumber}`, {
      method: "GET",
      headers: { "Content-Type": "application/json",
         Authorization: `Bearer ${sessionStorage.getItem('token')}`
       },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch application details");
    }
    return await response.json();
  } catch (error) {
    console.error("❌ Error fetching details by application number:", error);
    return null;
  }
};
 
 
 
export const deleteApplicationByNumber = async (applicationNumber) => {
  try {
    const response = await fetch(`http://152.67.189.231:8842/api/auth/delete_application_by_number/${applicationNumber}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
    });
    return await response.json();
  } catch (error) {
    console.error("❌ Error deleting application:", error);
    return null;
  }
};


 
export const getLinkedBankAccount = async (applicationNumber) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/get_linkedBankAccountsdetailsonly/${applicationNumber}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${sessionStorage.getItem('token')}`
       },
    });
    return await res.json();
  } catch (err) {
    console.error("Error fetching linked bank account:", err);
    return null;
  }
};
 

// export const getDocumentVerification = async (applicationNumber) => {
//   try {
//     const res = await fetch(`${process.env.REACT_APP_API_URL}/get_only_one_document_detail/${applicationNumber}`, {
//       headers: { 
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${sessionStorage.getItem('token')}`
//       },
//     });
//     return await res.json();
//   } catch (err) {
//     console.error("Error fetching Document Verification:", err);
//   }
// };

// export const getAcceptOffer = async (applicationNumber) => {
//   try {
//     const res = await fetch(`${process.env.REACT_APP_API_URL}/get_accept_offer_detailsonly/${applicationNumber}`, {
//       headers: { 
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${sessionStorage.getItem('token')}`
//       },
//     });
//     return await res.json();
//   } catch (err) {
//     console.error("Error fetching Accept Offer:", err);
//   }
// };

// export const getReviewAgreement = async (applicationNumber) => {
//   try {
//     const res = await fetch(`${process.env.REACT_APP_API_URL}/get_reviewandagreement_by_application_only/${applicationNumber}`, {
//       headers: { 
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${sessionStorage.getItem('token')}`
//       },
//     });
//     return await res.json();
//   } catch (err) {
//     console.error("Error fetching Review Agreement:", err);
//   }
// };

// export const getFunded = async (applicationNumber) => {
//   try {
//     const res = await fetch(`${process.env.REACT_APP_API_URL}/get_fund_details_by_applicationnoly/${applicationNumber}`, {
//       headers: { 
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${sessionStorage.getItem('token')}`
//       },
//     });
//     return await res.json();
//   } catch (err) {
//     console.error("Error fetching Funded data:", err);
//   }
// };


export const getDocumentVerification = async (applicationNumber) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/get_only_one_document_detail/${applicationNumber}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
    });
    return await res.json();
  } catch (err) {
    console.error("Error fetching Document Verification:", err);
  }
};
 
export const getAcceptOffer = async (applicationNumber) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/get_accept_offer_detailsonly/${applicationNumber}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
    });
    return await res.json();
  } catch (err) {
    console.error("Error fetching Accept Offer:", err);
  }
};
 
export const getReviewAgreement = async (applicationNumber) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/get_reviewandagreement_by_application_only/${applicationNumber}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
    });
    return await res.json();
  } catch (err) {
    console.error("Error fetching Review Agreement:", err);
  }
};
 
export const getFunded = async (applicationNumber) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/get_fund_details_by_applicationnoly/${applicationNumber}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
    });
    return await res.json();
  } catch (err) {
    console.error("Error fetching Funded data:", err);
  }
};
 
 
 
export const deleteLinkedBankAccount = async (applicationNumber) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/delete_Linked_applicationdetails/${applicationNumber}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    });
    return await res.json();
  } catch (error) {
    console.error("❌ Error deleting linked bank account:", error);
    return null;
  }
};
 
 
export const deleteDocumentVerification = async (applicationNumber) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/delete_application_documentdetails/${applicationNumber}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    });
    return await res.json();
  } catch (error) {
    console.error("❌ Error deleting document verification:", error);
    return null;
  }
};
 
 
export const deleteAcceptOffer = async (applicationNumber) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/delete_application_acceptoffer_details/${applicationNumber}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    });
    return await res.json();
  } catch (error) {
    console.error("❌ Error deleting accept offer:", error);
    return null;
  }
};
 
 
export const deleteReviewAgreement = async (applicationNumber) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/delete_Application_reviewandsignAgreementdetails/${applicationNumber}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    });
    return await res.json();
  } catch (error) {
    console.error("❌ Error deleting review agreement:", error);
    return null;
  }
};
 
 
export const deleteFunded = async (applicationNumber) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/delete_fundedInfo/${applicationNumber}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    });
    return await res.json();
  } catch (error) {
    console.error("❌ Error deleting funded data:", error);
    return null;
  }
};





export async function getAllApplicationUserId(userId) {
  try{
    const response = await fetch(`${process.env.REACT_APP_API_URL}/get_allApplicationDetails_by_user/${userId}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${sessionStorage.getItem("token")}`
      }
    });
    
    const data_json = await response.json()
    if(!response.ok){
      console.error(data_json.message);
    } 
    
    return data_json;

  }catch(error){

    console.error(error);
    return null;
  }
  
}




