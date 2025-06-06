// src/api.js
export async function loginUser({ username, password }) {
  const response = await fetch('http://152.67.189.231:8842/api/auth/login', {
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
