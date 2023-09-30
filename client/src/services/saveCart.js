import requestData from "./requestData";

const saveCart = async (cart) => {
  const response = await requestData({
    url: "http://127.0.0.1:4000/api/cart/save",
    method: "PUT",
    data: JSON.stringify(cart),
    headers: { "Content-Type": "application/json" },
  });
};

export default saveCart;
