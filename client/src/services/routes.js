const BASE_PATH = "http://127.0.0.1:4000";
const API_PATH = BASE_PATH + "/api";

const AUTH_PATH = API_PATH + "/user";
const TOKEN_PATH = AUTH_PATH + "/token";
const SIGNIN_PATH = AUTH_PATH + "/signin";
const SIGNUP_PATH = AUTH_PATH + "/signup";
<<<<<<< HEAD
const UPDATE_PWD_PATH = AUTH_PATH + "/password/update";
=======
const RESET_PWD_PATH = AUTH_PATH + "/reset";
>>>>>>> bdf0ad10c5356daa06ba11c687831b4f678208e0

const PRODUCT_PATH = API_PATH + "/product";
const CREATE_PRODUCT_PATH = PRODUCT_PATH + "/new";
const EDIT_PRODUCT_PATH = PRODUCT_PATH + "/edit";
const DELETE_PRODCUT_PATH = PRODUCT_PATH;
const UPLOAD_IMAGE_PATH = PRODUCT_PATH + "/image/upload";

const CART_PATH = API_PATH + "/cart";
const SAVE_CART_PATH = CART_PATH + "/save";
const CHECKOUT_PATH = CART_PATH + "/checkout";

export {
  BASE_PATH,
  API_PATH,
  TOKEN_PATH,
  SIGNIN_PATH,
  SIGNUP_PATH,
<<<<<<< HEAD
  UPDATE_PWD_PATH,
=======
  RESET_PWD_PATH,
>>>>>>> bdf0ad10c5356daa06ba11c687831b4f678208e0
  PRODUCT_PATH,
  CREATE_PRODUCT_PATH,
  EDIT_PRODUCT_PATH,
  DELETE_PRODCUT_PATH,
  UPLOAD_IMAGE_PATH,
  CART_PATH,
  SAVE_CART_PATH,
  CHECKOUT_PATH,
};
