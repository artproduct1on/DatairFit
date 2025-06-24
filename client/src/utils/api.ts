import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth-storage");
    if (token) {
      try {
        const parsedToken = JSON.parse(token).state.token;
        if (parsedToken) {
          config.headers.Authorization = `Bearer ${parsedToken}`;
        }
      } catch (e) {
        console.error("Failed to parse token from localStorage", e);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
