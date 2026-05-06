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
  async (error) => {
    if (typeof window !== "undefined") {
      const status = error?.response?.status;
      if (status === 401) {
        const code = error?.response?.data?.code;
        const token = localStorage.getItem("access_token");
        const hasSession = !!localStorage.getItem("session_id");

        const next = window.location.pathname + window.location.search;

        if (code === "SESSION_CONFLICT") {
          // Another device took over this account.
          localStorage.setItem("session_conflict_next", next);
          window.location.href = `/session-conflict`;
        } else if (code === "SESSION_MISSING" && token && !hasSession && !error?.config?._retry) {
          // Bootstrap session_id once, then retry the original request.
          try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            const resp = await axios.get(`${API_URL}/api/auth/session`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const sid = resp?.data?.sessionId;
            if (sid) {
              localStorage.setItem("session_id", sid);
              const cfg = error.config || {};
              cfg._retry = true;
              cfg.headers = cfg.headers || {};
              cfg.headers["X-Session-Id"] = sid;
              return api.request(cfg);
            }
          } catch (e) {
            // fallthrough to full logout below
          }
        } else {
          // Token invalid/expired or token format changed: force clean session.
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

