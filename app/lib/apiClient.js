import axios from "axios";

export const api = axios.create();

api.interceptors.request.use((config) => {
  if (typeof window === "undefined") return config;
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (typeof window !== "undefined") {
      const status = error?.response?.status;
      if (status === 401) {
        // Token invalid/expired or token format changed: force clean session.
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_data");
        localStorage.removeItem("active_quiz");
        // Avoid infinite loop if already on login
        if (!window.location.pathname.startsWith("/login")) {
          const next = window.location.pathname + window.location.search;
          window.location.href = `/login?callbackUrl=${encodeURIComponent(next)}`;
        }
      }
    }
    return Promise.reject(error);
  }
);

