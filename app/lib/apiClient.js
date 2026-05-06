import axios from "axios";

export const api = axios.create();

api.interceptors.request.use((config) => {
  if (typeof window === "undefined") return config;
  const token = localStorage.getItem("access_token");
  const sessionId = localStorage.getItem("session_id");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (sessionId) {
    config.headers = config.headers || {};
    config.headers["X-Session-Id"] = sessionId;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (typeof window !== "undefined") {
      const status = error?.response?.status;
      if (status === 401) {
        const code = error?.response?.data?.code;
        // Token invalid/expired or token format changed: force clean session.
        const next = window.location.pathname + window.location.search;

        if (code === "SESSION_CONFLICT") {
          // Another device took over this account.
          localStorage.setItem("session_conflict_next", next);
          window.location.href = `/session-conflict`;
        } else {
          localStorage.removeItem("access_token");
          localStorage.removeItem("user_data");
          localStorage.removeItem("active_quiz");
          localStorage.removeItem("session_id");
          // Avoid infinite loop if already on login
          if (!window.location.pathname.startsWith("/login")) {
            window.location.href = `/login?callbackUrl=${encodeURIComponent(next)}`;
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

