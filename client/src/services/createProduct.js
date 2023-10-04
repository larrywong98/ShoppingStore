import requestData from "./requestData";
import { CREATE_PRODUCT_PATH } from "./routes";

const createProduct = async (formData, navigate) => {
  let response = await requestData({
    url: CREATE_PRODUCT_PATH,
    method: "POST",
    headers: { authorization: "Bearer " + localStorage.getItem("token") },
    data: formData,
  });
  if (response.status === "ok") {
    navigate("/success", { state: { message: "Create successfully !!!" } });
  } else {
    navigate("/error");
  }
};
export default createProduct;
