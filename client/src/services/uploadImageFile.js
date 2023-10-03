import requestData from "./requestData";
import { UPLOAD_IMAGE_PATH } from "./routes";

const uploadImageFile = async (formData, navigate) => {
  const response = await requestData({
    url: UPLOAD_IMAGE_PATH,
    method: "POST",
    headers: { authorization: "Bearer " + localStorage.getItem("token") },
    data: formData,
  });

  if (response.length === 0) {
    navigate("/error");
    return "";
  } else {
    return response.name;
  }
};

export default uploadImageFile;
