import requestData from "./requestData";

const updatePwd = async (navigate) => {
  const response = await requestData({
    url: "http://127.0.0.1:4000/api/password/update",
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
