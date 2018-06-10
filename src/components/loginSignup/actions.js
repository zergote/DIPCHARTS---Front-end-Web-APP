import {
  REGION_REQUESTING,
  LOGIN_REQUESTING,
  CHANGE_TO_SIGNUP,
  CHANGE_TO_LOGIN,
  SIGNUP_REQUESTING
} from "./constants";

// Para realizar una acción del tipo LOGIN_REQUESTING
// necesitamos un USER_NAME y PASSWORD
const loginRequest = function loginRequest({ USER_NAME, PASSWORD }) {
  return {
    type: LOGIN_REQUESTING,
    USER_NAME,
    PASSWORD
  };
};

const regionRequest = function regionRequest() {
  return {
    type: REGION_REQUESTING
  };
};

const changeToSignup = function changeToSignup() {
  return {
    type: CHANGE_TO_SIGNUP
  };
};

const changeToLogin = function changeToLogin() {
  return {
    type: CHANGE_TO_LOGIN
  };
};

const signupRequest = function signupRequest({
  ID_REGION,
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  USER_NAME,
  PASSWORD
}) {
  return {
    type: SIGNUP_REQUESTING,
    ID_REGION,
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    USER_NAME,
    PASSWORD
  };
};

export {
  loginRequest,
  changeToSignup,
  changeToLogin,
  signupRequest,
  regionRequest
};
