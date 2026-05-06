import axios from "axios";

export const api = axios.create();

function attachAuthHeaders(config) {
  if (typeof window === "undefined") return config;
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

api.interceptors.request.use(attachAuthHeaders);
// Also attach to global axios so legacy imports keep working.
axios.interceptors.request.use(attachAuthHeaders);

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (typeof window !== "undefined") {
      const status = error?.response?.status;
      if (status === 401) {
        const next = window.location.pathname + window.location.search;
        // Token invalid/expired or not authorized: force clean session.
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_data");
        localStorage.removeItem("active_quiz");
        // Avoid infinite loop if already on login
        if (!window.location.pathname.startsWith("/login")) {
          window.location.href = `/login?callbackUrl=${encodeURIComponent(next)}`;
        }
      }
    }
    return Promise.reject(error);
  }
);

