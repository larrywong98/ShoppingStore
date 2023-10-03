import requestData from "./requestData";
import { UPDATE_PWD_PATH } from "./routes";

const updatePwd = async (navigate) => {
  const response = await requestData({
    url: UPDATE_PWD_PATH,
    method: "get",
  });
  if (response.status === "ok") {
    return "ok";
  } else {
    navigate("/error");
    return "error";
  }
};

export default updatePwd;
