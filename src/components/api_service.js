// src/api.js
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
  return data; // { token: '...' }
}


