import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

let isRefreshing = false;

api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/me") &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;
          await api.post("/auth/refresh", {}, { withCredentials: true });
          isRefreshing = false;
        }
        return api(originalRequest);
      } catch {
        isRefreshing = false;
        return Promise.reject(err);
      }
    }

    return Promise.reject(err);
  }
);

export default api;
