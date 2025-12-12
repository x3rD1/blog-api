import { Navigate } from "react-router";
import AuthContext from "./context/authContext";
import { useContext } from "react";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>loading...</div>;
  if (!user || !user.admin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
