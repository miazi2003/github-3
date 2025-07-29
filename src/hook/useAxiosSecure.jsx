// useAxiosSecure.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

// 🛡️ Interceptor: Automatically attach token from localStorage
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem("roavia-access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

const useAxiosSecure = () => axiosInstance;

export default useAxiosSecure;
