import requestData from "./requestData";
import { RESET_PWD_PATH } from "./routes";

const resetPwd = async (formData, navigate) => {
  const response = await requestData({
    url: RESET_PWD_PATH,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(formData),
  });
  if (response.status === "ok") {
    return "ok";
  } else {
    navigate("/error");
    return "error";
  }
};

export default resetPwd;
