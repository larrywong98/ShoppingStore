import requestData from "./requestData";
import { SAVE_CART_PATH } from "./routes";

const saveCart = async (cart) => {
  const response = await requestData({
    url: SAVE_CART_PATH,
    method: "PUT",
    data: JSON.stringify(cart),
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  if (response.status === "ok") {
    return "ok";
  } else {
    return "failed";
  }
};

export default saveCart;
