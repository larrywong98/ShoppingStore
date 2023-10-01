import requestData from "./requestData";

const editProduct = async (formData, id, navigate) => {
  let response = await requestData({
    url: "http://127.0.0.1:4000/product/edit/" + id,
    method: "PUT",
    data: formData,
  });
  if (response.status === "ok") {
    navigate("/success", { state: { message: "Edit successfully !!!" } });
  } else {
    navigate("/error");
  }
};
export default editProduct;
