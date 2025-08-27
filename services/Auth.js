import Client from "./Api";

export const RegisterUser = async (data) => {
  try {
    // Correct the path to '/register'
    const res = await Client.post(`/register`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const SignInUser = async (data) => {
  try {
    // Correct the path to '/login'
    const res = await Client.post(`/login`, data);
    localStorage.setItem('token', res.data.token);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const CheckSession = async () => {
  try {
    // Correct the path to '/session'
    const res = await Client.get('/session');
    return res.data;
  } catch (error) {
    throw error;
  }
};