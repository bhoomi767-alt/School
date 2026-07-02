const hostname = typeof window !== "undefined" ? window.location.hostname : "";

export const API_BASE_URL = hostname === "localhost" || hostname === "127.0.0.1"
  ? "http://localhost:3000"
  : "https://school-m7jz.vercel.app";
