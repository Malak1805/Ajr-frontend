import axios from 'axios';

// Assuming you have globals.js set up correctly,
// BASE_URL will be 'http://localhost:3000'
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Fix the typo from base_URL to baseURL
const Client = axios.create({ baseURL: BASE_URL });

Client.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => {
    throw error;
  }
);

export default Client;