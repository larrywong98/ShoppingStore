import requestData from "./requestData";

const deleteProduct = async (id, navigate) => {
  let response = await requestData({
    url: "http://127.0.0.1:4000/api/product/delete/" + id,
    method: "DELETE",
  });
  if (response.status === "ok") {
    navigate("/success", { state: { message: "Delete successfully !!!" } });
  } else {
    navigate("/error");
  }
};
export default deleteProduct;
