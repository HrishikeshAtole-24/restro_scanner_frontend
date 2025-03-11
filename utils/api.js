export const BASE_URL = 'https://restro-scanner-backend.onrender.com';

export async function apiCall(endpoint, method = 'GET', data = null, token = null) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, config);
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || json.message || 'API call failed');
  }
  return json;
}
