// export const users = [
//   { id: 1, name: 'Rahim Customer', email: 'customer@kenakata.com', password: '123456', role: 'CUSTOMER' },
//   { id: 2, name: 'Karim Seller', email: 'seller@kenakata.com', password: '123456', role: 'SELLER' },
//   { id: 3, name: 'Admin User', email: 'admin@kenakata.com', password: '123456', role: 'ADMIN' }
// ];

// export function loginUser(email, password) {
//   return users.find(u => u.email === email && u.password === password) || null;
// }

// export function registerUser({ name, email, password }) {
//   if (users.find(u => u.email === email)) return null;
//   const user = { id: users.length + 1, name, email, password, role: 'CUSTOMER' };
//   users.push(user);
//   return user;
// }


import api from './api';

export const loginUser = async (email, password) => {
  const response = await api.post('/api/auth/login', { email, password });
  return response.data;
};

export const registerUser = async ({ name, email, password, role, business_name }) => {
  const response = await api.post('/api/auth/register', {
    name,
    email,
    password,
    role,
    business_name,
  });
  return response.data;
};

export const getVendorProfile = async (userId) => {
  const response = await api.get(`/api/vendors/${userId}`);
  return response.data;
};

export const updateVendorProfile = async (userId, profile) => {
  const response = await api.patch(`/api/vendors/${userId}`, profile);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post('/api/auth/logout');
  return response.data;
};