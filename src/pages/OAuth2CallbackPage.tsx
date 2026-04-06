import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuth, fetchCurrentUser, saveAuth } from "../lib/auth";

// This page handles the OAuth2 redirect from Spring Boot after Google login.
// Spring Boot redirects to: http://localhost:3000/oauth2/callback?token=...&provider=GOOGLE
// Vite does NOT proxy /oauth2/callback — so React handles it directly. ✅

export function OAuth2CallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        // No token means something went wrong — go back to auth
        navigate("/auth", { replace: true });
        return;
      }

      try {
        const user = await fetchCurrentUser(token);
        saveAuth({ accessToken: token, user });
        // Clean the URL and navigate to the app
        window.history.replaceState({}, document.title, "/measurement");
        navigate("/measurement", { replace: true });
      } catch {
        clearAuth();
        navigate("/auth?error=oauth_failed", { replace: true });
      }
    };

    void run();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center text-sm font-medium text-slate-500">
      Signing you in...
    </div>
  );
}