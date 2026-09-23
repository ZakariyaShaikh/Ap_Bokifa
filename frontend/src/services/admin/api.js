import axios from "axios";
import { useAuth } from "../../context/admin/AuthContext";

const API_BASE_URL = "/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Context-aware API service that can access auth context
export const createAuthAwareApi = () => {
  const { getAccessToken } = useAuth();

  // Create a new axios instance that uses the context's token
  const authApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor to add auth token
  authApi.interceptors.request.use(
    (config) => {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return authApi;
};

// Original api instance for non-auth requests
export default api;

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("refreshToken="))
          ?.split("=")[1];

        if (refreshToken) {
          // Note: Refresh endpoint is not implemented in backend
          // But we keep this for future reference
          localStorage.removeItem("accessToken");
          document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location.href = "/login";
        }
      } catch {
        localStorage.removeItem("accessToken");
        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export const authService = {
  login: async (email, password) => {
    const response = await api.post("/auth/v1/login", { email, password });
    return response.data;
  },

  register: async (name, email) => {
    const response = await api.post("/auth/v1/register", { name, email });
    return response.data;
  },

  verifyOtp: async (email, otp) => {
    const response = await api.post("/auth/v1/verify", { email, otp });
    return response.data;
  },

  changeTempPassword: async (email, newPassword) => {
    const response = await api.put("/auth/v1/change-tem", { email, newPassword });
    return response.data;
  },
};

// ==================== AUTHORS ====================

export const authorService = {
  getAll: async () => {
    const response = await api.get("/admin/author/v1/");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/admin/author/v1/${id}`);
    return response.data;
  },

  create: async (formData) => {
    const response = await api.post("/admin/author/v1/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  update: async (id, formData) => {
    const response = await api.put(`/admin/author/v1/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

// ==================== BOOKS ====================

export const bookService = {
  getAll: async () => {
    const response = await api.get("/admin/books/v1/");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/admin/books/v1/${id}`);
    return response.data;
  },

  update: async (id, formData) => {
    const response = await api.put(`/admin/books/v1/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/admin/books/v1/delete/${id}`);
    return response.data;
  },
};

// ==================== BLOGS ====================

export const blogService = {
  getAll: async () => {
    const response = await api.get("/admin/blogs/v1/");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/admin/blogs/v1/${id}`);
    return response.data;
  },

  create: async (formData) => {
    const response = await api.post("/admin/blogs/v1/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  update: async (id, formData) => {
    const response = await api.put(`/admin/blogs/v1/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/admin/blogs/v1/delete/${id}`);
    return response.data;
  },
};

// ==================== PUBLIC API SERVICES ====================

// User profile service for customers
export const userService = {
  getProfile: async (token) => {
    const response = await api.get("/auth/v1/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};