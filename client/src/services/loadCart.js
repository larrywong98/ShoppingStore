import requestData from "./requestData";
import { initCart } from "../reducer/cartSlice";
import { store } from "../reducer/store";
import { CART_PATH } from "./routes";

const loadCart = () => {
  return async (dispatch, getState) => {
    const cart = await getCartRequest();
    if (cart.length === 0) cart.push({ addedProducts: [] });
    dispatch(initCart({ cart: cart[0].addedProducts }));
  };
};

const getCartRequest = async () => {
  const user = store.getState().userReducer;
  const response = await requestData({
    url: `${CART_PATH}/${user.userId}`,
    method: "get",
    headers: { authorization: "Bearer " + localStorage.getItem("token") },
  });
  return response;
};

export default loadCart;
