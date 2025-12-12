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
        const res = await fetch("/api/auth/token/refresh", {
          method: "POST",
          credentials: "include",
        });

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

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
