import axios from 'axios';


const BASE_URL = import.meta.env.VITE_BACKEND_URL;

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