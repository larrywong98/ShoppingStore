import requestData from "./requestData";
import { initCart } from "../reducer/cartSlice";

const loadCart = () => {
  return async (dispatch, getState) => {
    const cart = await getCartRequest();
    dispatch(initCart({ cart: cart.addedProducts }));
  };
};

const getCartRequest = async () => {
  const response = await requestData({
    url: "http://127.0.0.1:4000/cart/larry",
    method: "get",
  });
  return response;
};

export default loadCart;
