import { signIn } from "../reducer/userSlice";
import loadCart from "./loadCart";
import requestData from "./requestData";

const getJwtToken = async (username, password, navigate) => {
  const response = await requestData({
    url: "http://127.0.0.1:4000/api/token",
    method: "POST",
    data: JSON.stringify({ name: username, pwd: password }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.status === "ok") {
    localStorage.setItem("token", response.token);
    return "ok";
  } else if (response.status === "unauthorized") {
    return "unauthorized";
  } else {
    navigate("/error");
  }
};

const signInRequest = async (dispatch, navigate) => {
  const response = await requestData({
    url: "http://127.0.0.1:4000/api/signin",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  if (response.status === "ok") {
    dispatch(
      signIn({
        userId: response.id,
        userName: response.name,
        admin: response.admin,
      })
    );
    dispatch(loadCart());
    navigate("/success", {
      state: { message: "Login Successfully !!!" },
    });
    return "ok";
  } else if (response.status === "unauthorized") {
    return "unauthorized";
  } else {
    navigate("/error");
    return "error";
  }
};

const signUpRequest = async (username, password, navigate) => {
  const response = await requestData({
    url: "http://127.0.0.1:4000/api/signup",
    method: "POST",
    data: JSON.stringify({ userName: username, pwd: password }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.status === "ok") {
    navigate("/signin");
  } else {
    navigate("/error");
  }
};

export { getJwtToken, signInRequest, signUpRequest };
