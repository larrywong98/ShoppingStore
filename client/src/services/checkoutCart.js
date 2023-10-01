import requestData from "./requestData";

const checkoutCart = async (userId, cart, navigate) => {
  const response = await requestData({
    url: "http://127.0.0.1:4000/api/cart/checkout",
    method: "delete",
    data: JSON.stringify({ userId: userId, cart: cart }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.status === "ok") {
    navigate("/success", { state: { message: "Product Purchased !!!" } });
  } else {
    navigate("/error");
  }
};
export default checkoutCart;
