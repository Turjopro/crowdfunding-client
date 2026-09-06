import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

// Attach token to every request
axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosSecure;