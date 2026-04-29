import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

const api = axios.create({ baseURL: BASE_URL });

// Attach JWT to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("tripwise_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  googleLogin: (idToken) => api.post("/api/auth/google", { token: idToken }),
};

export const tripsApi = {
  save: (userSelection, tripData) =>
    api.post("/api/trips", {
      userSelection: JSON.stringify(userSelection),
      tripData: JSON.stringify(tripData),
    }),
  getAll: () => api.get("/api/trips"),
  getById: (id) => api.get(`/api/trips/${id}`),
  delete: (id) => api.delete(`/api/trips/${id}`),
};
