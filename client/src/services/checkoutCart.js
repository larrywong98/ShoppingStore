import requestData from "./requestData";
import { CHECKOUT_PATH } from "./routes";

const checkoutCart = async (userId, cart, navigate) => {
  const response = await requestData({
    url: CHECKOUT_PATH,
    method: "delete",
    data: JSON.stringify({ userId: userId, cart: cart }),
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  if (response.status === "ok") {
    navigate("/success", { state: { message: "Product Purchased !!!" } });
  } else {
    navigate("/error");
  }
};
export default checkoutCart;
