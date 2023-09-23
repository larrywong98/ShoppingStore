import { Outlet } from "react-router-dom";
const ProductsLayout = ({ children }) => {
  return (
    <>
      <Outlet />
    </>
  );
};
export default ProductsLayout;
