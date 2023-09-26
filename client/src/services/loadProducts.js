import { load, lastAdded } from "../reducer/productSlice";
const loadProducts = () => {
  return async (dispatch, getState) => {
    const products = await getProductsRequest();
    dispatch(load({ products: products }));
    dispatch(lastAdded());
  };
};

const getProductsRequest = async () => {
  const res = await fetch("http://127.0.0.1:4000/products", {
    method: "get",
  });
  return await res.json();
};

export default loadProducts;
