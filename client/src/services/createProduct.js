import requestData from "./requestData";

const createProduct = async (formData, navigate) => {
  let response = await requestData({
    url: "http://127.0.0.1:4000/product/create",
    method: "POST",
    data: formData,
  });
  if (response.status === "ok") {
    navigate("/success", { state: { message: "Create successfully !!!" } });
  } else {
    navigate("/error");
  }
};
export default createProduct;
