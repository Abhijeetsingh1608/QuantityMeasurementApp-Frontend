import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // ✅ Proxy specific /auth API endpoints — NOT /auth itself (that's the React login page)
      "/auth/login": { target: "http://localhost:8080", changeOrigin: true, secure: false },
      "/auth/register": { target: "http://localhost:8080", changeOrigin: true, secure: false },
      "/auth/status": { target: "http://localhost:8080", changeOrigin: true, secure: false },
      "/auth/user": { target: "http://localhost:8080", changeOrigin: true, secure: false },
      "/auth/logout": { target: "http://localhost:8080", changeOrigin: true, secure: false },

      // ✅ Measurement API
      "/api": { target: "http://localhost:8080", changeOrigin: true, secure: false },

      // ✅ OAuth2 initiation (clicking "Continue with Google")
      "/oauth2/authorization": { target: "http://localhost:8080", changeOrigin: true, secure: false },

      // ✅ OAuth2 code exchange (Spring Boot internal callback from Google)
      "/login/oauth2": { target: "http://localhost:8080", changeOrigin: true, secure: false },
    },
  },
});