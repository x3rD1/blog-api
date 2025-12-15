import { useState, useEffect } from "react";
import AuthContext from "./authContext";
import parseJwt from "../utils/jwt";

function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restore() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/token/refresh`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (!res.ok) {
          setAccessToken(null);
          setUser(null);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setAccessToken(data.accessToken);
        setUser(parseJwt(data.accessToken));
        setLoading(false);
      } catch (err) {
        console.error("Session restore failed:", err);
        setLoading(false);
      }
    }

    restore();
  }, []);

  const logout = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  };
  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, user, setUser, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
