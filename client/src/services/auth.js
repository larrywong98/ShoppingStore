import { signIn } from "../reducer/userSlice";
import loadCart from "./loadCart";
import requestData from "./requestData";
import { SIGNIN_PATH, SIGNUP_PATH, TOKEN_PATH } from "./routes";

const getJwtToken = async (username, password, navigate) => {
  const response = await requestData({
    url: TOKEN_PATH,
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
    url: SIGNIN_PATH,
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
    navigate("/success", { state: { message: "Login Successful" } });
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
    url: SIGNUP_PATH,
    method: "POST",
    data: JSON.stringify({ userName: username, pwd: password }),
    headers: { "Content-Type": "application/json" },
  });
  // console.log(response.status);
  if (response.status === "ok") {
    navigate("/success", { state: { message: "Sign Up Successful" } });
    return "ok";
  } else if (response.status === "exist") {
    return "exist";
  } else {
    navigate("/error");
    return "error";
  }
};

export { getJwtToken, signInRequest, signUpRequest };
