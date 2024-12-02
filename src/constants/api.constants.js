export const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/api/v1';

export const API_ENDPOINTS = {
  register: `${BASE_URL}/users/register`,
  login: `${BASE_URL}/users/login`,
  getUser: `${BASE_URL}/users/get`,
};