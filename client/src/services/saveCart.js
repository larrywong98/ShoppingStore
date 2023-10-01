import requestData from "./requestData";

const saveCart = async (cart) => {
  const response = await requestData({
    url: "http://127.0.0.1:4000/api/cart/save",
    method: "PUT",
    data: JSON.stringify(cart),
    headers: { "Content-Type": "application/json" },
  });
  if (response.status === "ok") {
    console.log("ok");
    return "ok";
  } else {
    console.log("save cart failed");
    return "failed";
  }
};

export default saveCart;
