import { load, lastAdded } from "../reducer/productSlice";
import requestData from "./requestData";
const loadProducts = () => {
  return async (dispatch, getState) => {
    const products = await getProductsRequest();
    dispatch(load({ products: products }));
    dispatch(lastAdded());
  };
};

const getProductsRequest = async () => {
  const response = await requestData({
    url: "http://127.0.0.1:4000/products",
    method: "get",
  });
  return response;
};

export default loadProducts;
