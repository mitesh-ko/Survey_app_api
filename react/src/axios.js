import axios from "axios";
import router from "./router";
import { useNavigate } from 'react-router-dom';

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE_TOKEN)}`
  return config
});

axiosClient.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE_TOKEN)
    const navigateTo = useNavigate();
    navigateTo('/login');
    return error;
  }
  throw error;
})

export default axiosClient;