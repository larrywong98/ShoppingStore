import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const ProductsLayout = ({ children }) => {
  return (
    <>
      <Outlet />
    </>
  );
};
export default ProductsLayout;
