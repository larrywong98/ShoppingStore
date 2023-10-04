import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import isNumeric from "../utils/isNumeric";
import { useState } from "react";

// validate url
const urlErrorHandle = (location, products) => {
  let productIndex = location.pathname.split("/").slice(-1)[0];
  if (!isNumeric(productIndex)) {
    return "error";
  }
  productIndex = parseInt(productIndex);
  if (productIndex >= products.length || productIndex < 0) {
    return "error";
  }
  return "ok";
};

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.userReducer);
  const products = useSelector((state) => state.productReducer.products);
  const location = useLocation();
  // const [firstLoad, setFirstLoad] = useState(true);

  // haven't signed in
  if (!location.pathname.includes("signin") && user.signedIn === false) {
    return <Navigate to="/signin" />;
  }

  // // already signed in
  // if (location.pathname.includes("signin") && user.signedIn === true) {
  //   return <Navigate to="/products" />;
  // }

  // not admin
  if (
    (location.pathname.includes("create") ||
      location.pathname.includes("edit")) &&
    user.admin === false
  ) {
    return <Navigate to="/products" />;
  }

  // product edit url error handle
  if (location.pathname.includes("/products/edit")) {
    const status = urlErrorHandle(location, products);
    if (status === "error") {
      return <Navigate to="/error" />;
    }
  }

  // product detail url error handle
  if (location.pathname.includes("/products/get")) {
    const status = urlErrorHandle(location, products);
    if (status === "error") {
      return <Navigate to="/error" />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
