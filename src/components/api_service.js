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
  const data = data_json?.data;
  return data;
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



export async function CreateAccount( firstname, lastname, email, phonenumber, password) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/create-account`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify({ firstname, lastname, email, phonenumber, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create account');
  }

  return await response.json();
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

  const data = await response.json();
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

  const data = await response.json();
  return data;
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

  return await response.json();
}


export async function deleteRole(id){
  const response = await fetch(`${API_URL}/roles/${id}`, {
    method:'DELETE',
    headers:{
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    }
  })
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete role');
  }
  return await response.json();
}




export async function resetPassword({ email, newPassword}) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({ email, newPassword}),
    });

    if (!response.ok) {
      throw new Error('Password reset failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
}




// export async function createRole (req, res){

//   try {
//     const { id, roleName, description } = req.body;

//     const newRole = new Role({
//       id,
//       roleName,
//       description,
//     });

//     await newRole.save(); // saves to MongoDB

//     res.status(201).json({ message: 'Role created successfully', role: newRole });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



// export async function refreshAccessToken(refreshToken) {
//   try {
//     if (!refreshToken) return false;

//     const response = await fetch(`${process.env.REACT_APP_API_URL}/refresh-token`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ refreshToken }),
//     });

//     const data = await response.json();

//     if (response.ok && data.token && data.refreshToken) {
//       // Store new tokens and reset session time
//       sessionStorage.setItem('token', data.token);
//       sessionStorage.setItem('refreshToken', data.refreshToken);
//       sessionStorage.setItem('loginTime', new Date().getTime());
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     console.error('Token refresh failed:', error);
//     return false;
//   }
// }






