import axios from 'axios';

// Define the base URL for the Gateway
export async function fetchAuthStatus() {
  try {
    const response = await fetch("/auth/status", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      return { authenticated: false };
    }

    return await response.json();
  } catch (error) {
    return { authenticated: false };
  }
}