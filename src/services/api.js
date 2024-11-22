import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  withCredentials: true, // For session handling
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export default api;
