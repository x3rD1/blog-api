import parseJwt from "../utils/jwt";
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null); // optional, but useful
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  // Restore session on first load (silent refresh)
  useEffect(() => {
    async function restore() {
      try {
        const res = await fetch("/api/auth/token/refresh", {
          method: "POST",
          credentials: "include",
        });

        if (!res.ok) {
          setAccessToken(null);
          setUser(null);
          return;
        }

        const data = await res.json();
        setAccessToken(data.accessToken);
        setUser(parseJwt(data.accessToken));
      } catch (err) {
        console.error("Session restore failed:", err);
      } finally {
        setLoading(false);
      }
    }

    restore();
  }, []);

  async function login(email, password) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }

    setAccessToken(data.accessToken);
    setUser(parseJwt(data.accessToken));
  }

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    setAccessToken(null);
    setUser(null);
  }

  async function signup(username, email, password, confirmPassword) {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, confirmPassword }),
    });

    const data = await res.json();

    if (!res.ok) {
      const fieldErrors = {};
      if (data.errors) {
        data.errors.forEach((err) => {
          if (!fieldErrors[err.path]) fieldErrors[err.path] = err.msg;
        });
        setErrors(fieldErrors);
      }
      throw new Error(data.message);
    }
    return data;
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        login,
        logout,
        signup,
        errors,
        setErrors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
