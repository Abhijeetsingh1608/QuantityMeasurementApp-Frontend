export const TOKEN_KEY = "qm_access_token";
export const USER_KEY = "qm_user";

// ✅ Empty string = relative URLs → goes through Vite proxy → reaches Spring Boot on 8080
// ❌ Never use "http://localhost:8080" here — it bypasses the proxy and breaks CORS + OAuth2
export const API_BASE_URL = "";

export const APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL ?? "http://localhost:3000";
