import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const tokenKey = import.meta.env.VITE_TOKEN_KEY || "access_token";
    const token = localStorage.getItem(tokenKey);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Phiên đăng nhập hết hạn hoặc không hợp lệ.");
      const tokenKey = import.meta.env.VITE_TOKEN_KEY || "access_token";

      localStorage.removeItem(tokenKey);
      localStorage.removeItem("userInfo");

      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default apiClient;
