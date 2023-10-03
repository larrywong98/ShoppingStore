import { load, lastAdded } from "../reducer/productSlice";
import requestData from "./requestData";
import { PRODUCT_PATH } from "./routes";
const loadProducts = () => {
  return async (dispatch, getState) => {
    const products = await getProductsRequest();
    dispatch(load({ products: products }));
    dispatch(lastAdded());
  };
};

const getProductsRequest = async () => {
  const response = await requestData({
    url: PRODUCT_PATH,
    method: "get",
    headers: { authorization: "Bearer " + localStorage.getItem("token") },
  });
  return response;
};

export default loadProducts;
