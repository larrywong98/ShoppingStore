import requestData from "./requestData";
import { DELETE_PRODCUT_PATH } from "./routes";

const deleteProduct = async (id, navigate) => {
  let response = await requestData({
    url: `${DELETE_PRODCUT_PATH}/${id}`,
    method: "DELETE",
    headers: { authorization: "Bearer " + localStorage.getItem("token") },
  });
  if (response.status === "ok") {
    navigate("/success", { state: { message: "Delete successfully !!!" } });
  } else {
    navigate("/error");
  }
};
export default deleteProduct;
