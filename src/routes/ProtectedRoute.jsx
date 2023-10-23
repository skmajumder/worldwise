import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const lastVisitedLocation = location.pathname;

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("lastVisitedLocation", lastVisitedLocation);
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate, lastVisitedLocation]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
