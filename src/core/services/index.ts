import axios from 'axios';
import WebApp from '@twa-dev/sdk';
import { getTokenByTgInitData } from './login.service';

export const api = axios.create({
  baseURL: `https://happyfarmclicker.shop/api/v1`,
  //baseURL: `http://localhost:5001/api/v1`,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token !== null) {
    const data = JSON.parse(token);
    config.headers.Authorization = `Bearer ${data.token}`;
  }
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403) {
      WebApp.close();
    } else if (
      error.response?.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const data = WebApp.initData;
        const { token } = await getTokenByTgInitData(data);
        localStorage.setItem('token', JSON.stringify(token));
        return api.request(originalRequest);
      } catch (e) {
        console.log(e, 'UnauthorizedError');
      }
    }
    throw error;
  }
);
