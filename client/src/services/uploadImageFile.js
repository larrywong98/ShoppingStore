import requestData from "./requestData";

const uploadImageFile = async (formData, navigate) => {
  const response = await requestData({
    url: "http://127.0.0.1:4000/image/upload",
    method: "POST",
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
