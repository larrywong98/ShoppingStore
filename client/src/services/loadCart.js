import requestData from "./requestData";
import { initCart } from "../reducer/cartSlice";

const loadCart = () => {
  return async (dispatch, getState) => {
    const cart = await getCartRequest();
    if (cart.length === 0) cart.push({ name: "", addedProducts: [] });
    dispatch(initCart({ cart: cart[0].addedProducts }));
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
