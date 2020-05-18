import * as actionTypes from "../action/actionTypes";
import { updateObject } from "../../asset/utility";

const initialState = {
  loading: false,
  isLogIn: false,
  cookie: null,
  data: null,
  isRegistered: null,
  error: null,
  errorMessage: "",
  authReturnRoute: "/",
  isLoginModalOpen: false
};

//# HERE IS THE REDUCER OR CASE'S
const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.INIT_LOGIN:
      return initLogin(state, payload);
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, payload);
    case actionTypes.LOGIN_FAIL:
      return loginFail(state, payload);
    case actionTypes.REGISTER_SUCCESS:
      return registerSuccess(state, payload);
    case actionTypes.REGISTER_FAIL:
      return registerFail(state, payload);
    case actionTypes.LOGOUT:
      return logout(state, payload);
    case actionTypes.SET_AUTH_RETURN_ROUTE:
      return setRoute(state, payload);
    case actionTypes.SET_LOGIN_MODAL:
      return setLoginModal(state, payload);
    default:
      return state;
  }
};

/*--- CASES ARE HERE DEFINED */
// UTILITY FUNCTION CALCULATE UTILIZATION

const setLoginModal = (state, { value }) => {
  return updateObject(state, {
    isLoginModalOpen: value
  });
};
const setRoute = (state, { route }) => {
  return updateObject(state, {
    authReturnRoute: route
  });
};
const initLogin = (state, payload) => {
  return updateObject(state, {
    loading: true
  });
};
const registerSuccess = (state, { data: obj }) => {
  const { status, data } = obj;
  return updateObject(state, {
    loading: false,
    isRegistered: status,
    data: data,
    isLoginModalOpen: false
  });
};
const registerFail = (state, { error }) => {
  return updateObject(state, {
    loading: false,
    error: true,
    data: null,
    errorMessage: error.msg
  });
};
const loginSuccess = (state, { data: obj }) => {
  const { status, data } = obj;
  return updateObject(state, {
    loading: false,
    isLogIn: status,
    data: data,
    isLoginModalOpen: false
  });
};
const loginFail = (state, { error }) => {
  return updateObject(state, {
    loading: false,
    error: true,
    isLogIn: false,
    data: null,
    errorMessage: error.msg
  });
};
const logout = (state, payload) => {
  return updateObject(state, {
    loading: false,
    isLogIn: false,
    cookie: null,
    data: null,
    isRegistered: null,
    error: null
  });
};

export default authReducer;
