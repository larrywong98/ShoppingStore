import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.userReducer);
  const location = useLocation();
  if (user.signedIn === false) {
    return <Navigate to="/signin" />;
  }

  if (
    (location.pathname.includes("create") ||
      location.pathname.includes("edit")) &&
    user.admin === false
  ) {
    return <Navigate to="/products" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
