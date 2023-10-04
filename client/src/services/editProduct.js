import requestData from "./requestData";
import { EDIT_PRODUCT_PATH } from "./routes";

const editProduct = async (formData, id, navigate) => {
  let response = await requestData({
    url: `${EDIT_PRODUCT_PATH}/${id}`,
    method: "PUT",
    headers: { authorization: "Bearer " + localStorage.getItem("token") },
    data: formData,
  });
  if (response.status === "ok") {
    navigate("/success", { state: { message: "Edit successfully !!!" } });
  } else {
    navigate("/error");
  }
};
export default editProduct;
