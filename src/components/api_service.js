
export async function loginUser({ username, password }) {

  // console.log('Logging in user:', { username, password, processEnv: process.env.REACT_APP_API_URL });
  const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
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

  const data = await response.json();
  console.log('Login response data:', data);
  if (data.token) {
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('role', data.role);
    sessionStorage.setItem('loginTime', new Date().getTime());
  } else {
    throw new Error('Token not found in response');
  }
  return data;
}


export async function Register({ username, password, role }) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, role }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch user data');
  }

  const data = await response.json();
  return data;
}



// "id": 1,
//         "roleName": "Admin",
//         "description": "Adminstrator",
//         "rcreTime": "2025-06-10T15:24:19.30809",
//         "updtTime": null


export async function createRole({roleName, description}) {

  console.log('Creating role:', { roleName, description, apiUrl: process.env.REACT_APP_API_URL });
  if (!roleName || !description) {
    throw new Error('Role Name and Description are required');
  }
  const response = await fetch(`${process.env.REACT_APP_API_URL}/roles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      roleName,
      description
    }),

  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error("Hii" +errorData.message || 'Failed to create role');
  }

  const data = await response.json();
  console.log('Fetched roles:', data);
  return data;
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