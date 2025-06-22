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

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  const data_json = await response.json();
  const data = data_json?.data;
  console.log('OTP verification response:', data);
  console.log('Login response data:', data);
  if (data.token) {
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('username', data.userId);
    sessionStorage.setItem('role', data.role);
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

export async function createUser({ firstname, lastname, email, phone, role, isActive }) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      firstName: firstname,
      lastName: lastname,
      email,
      phone,
      active: isActive,
      rcreationUser: 'system', // or pass dynamically
      role: { roleName: role } // assumes backend maps roleName to roleId
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create user');
  }

  const data = await response.json();
  return data;
}



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

  if (!response.ok){
    const errorData = await response.json();
    throw new Error(errorData?.message || 'Failed to add user');

  }

  const data = await response.json();
  return data;
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

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || 'Failed to fetch user');
  }

  const data_json = await response.json();
  return data_json;
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
