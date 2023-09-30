import requestData from "./requestData";
import { initCart } from "../reducer/cartSlice";
import { store } from "../reducer/store";

const loadCart = () => {
  return async (dispatch, getState) => {
    const cart = await getCartRequest();
    console.log(cart);
    if (cart.length === 0) cart.push({ addedProducts: [] });
    dispatch(initCart({ cart: cart[0].addedProducts }));
  };
};

const getCartRequest = async () => {
  const user = store.getState().userReducer;
  const response = await requestData({
    url: "http://127.0.0.1:4000/cart/" + user.userId,
    method: "get",
  });
  return response;
};

export default loadCart;
