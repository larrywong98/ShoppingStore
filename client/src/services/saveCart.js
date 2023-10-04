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
<<<<<<< HEAD
    console.log("ok");
    return "ok";
  } else {
    console.log("save cart failed");
=======
    return "ok";
  } else {
>>>>>>> bdf0ad10c5356daa06ba11c687831b4f678208e0
    return "failed";
  }
};

export default saveCart;
