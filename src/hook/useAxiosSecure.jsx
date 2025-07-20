import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

// Add interceptors ONCE
axiosInstance.interceptors.request.use(config => {

  return config;
});

const useAxiosSecure = () => axiosInstance;

export default useAxiosSecure;