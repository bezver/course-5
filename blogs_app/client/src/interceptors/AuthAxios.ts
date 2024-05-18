import axios, { AxiosInstance } from 'axios';
import { LoginService } from '../services/Login.service';

const authAxios: AxiosInstance = axios.create();

authAxios.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(new Error(error.message));
  }
);

authAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      LoginService.logout();
    }
    return Promise.reject(new Error(error.message));
  }
);

export default authAxios;
