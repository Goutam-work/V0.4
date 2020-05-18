import * as actionTypes from "./actionTypes";
// import { API } from "../../utils/api";
import axios from "axios";

import qs from "qs";
// import cookies from "js-cookies";

axios.defaults.baseURL = "http://54.185.204.216/";

// const checkCookie = () => {
//   if (cookies.getItem("token") !== null) {
//     console.log(cookies.getItem("token"));
//     const cookie = cookies.getItem("token");
//     axios.defaults.headers.common["Authorization"] = "Bearer " + cookie;
//   }
// };
// const setCookie = () => {
//   if (cookies.getItem("token") !== null) {
//     console.log(cookies.getItem("token"));
//     const cookie = cookies.getItem("token");
//     axios.defaults.headers.common["Authorization"] = "Bearer " + cookie;
//   }
// };
// const setAxiosHeader = () => {
//   axios.defaults.headers.common["Authorization"] = null;
// };
const initLogin = data => {
  return {
    type: actionTypes.INIT_LOGIN
  };
};
export const setLoginModal = value => {
  return {
    type: actionTypes.SET_LOGIN_MODAL,
    payload: { value }
  };
};
const loginSuccess = data => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: { data }
  };
};
const loginFail = error => {
  return {
    type: actionTypes.LOGIN_FAIL,
    payload: { error }
  };
};
const registerSuccess = data => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    payload: { data }
  };
};
const registerFail = error => {
  return {
    type: actionTypes.REGISTER_FAIL,
    payload: { error }
  };
};

export const signUpAsync = ({ signupEmail, signupName, signupPass }) => {
  //# HERE WE CREATE DYNMAIC ACTION DISPATCHER FOR ALL CASE'S
  //# IF ID PASS THEN ACCORDING TO ID ARENAS RETURN OTHERWISE
  //# RETURN ALL

  return (dispatch, getState) => {
    //# HERE MAKE ASYNC CALLS.
    dispatch(initLogin());
    const reqBody = {
      name: signupName,
      email: signupEmail,
      password: signupPass
    };
    axios
      .post("/api/authentication/signup", qs.stringify(reqBody), {
        withCredentials: true
      })
      .then(res => {
        const { status, message } = res.data;
        dispatch(registerSuccess({ status, message }));
      })
      .catch(err => {
        console.log("error");
        dispatch(
          registerFail({
            status: false,
            error: true,
            msg: "Please try again by refresh..!"
          })
        );
      });
  };
};

export const initLoginAsync = ({ loginEmail, loginPass }) => {
  //# HERE WE CREATE DYNMAIC ACTION DISPATCHER FOR ALL CASE'S
  //# IF ID PASS THEN ACCORDING TO ID ARENAS RETURN OTHERWISE
  //# RETURN ALL

  return (dispatch, getState) => {
    //# HERE MAKE ASYNC CALLS.
    dispatch(initLogin());
    const reqBody = {
      email: loginEmail,
      password: loginPass
    };
    console.log(reqBody);
    axios
      .post("/api/authentication/login", qs.stringify(reqBody), {
        withCredentials: true
      })
      .then(res => {
        console.log(res);
        axios
          .post("/api/authentication/isLoggedIn", "", { withCredentials: true })
          .then(res => {
            console.log("125;isLogin", res);
            const { data } = res;
            dispatch(loginSuccess(data));
          })
          .then(data => {
            console.log("130;isLogin", data);
          })
          .catch(err => {
            console.log("133;isLogin", err);
          });
      })
      .then(response => {
        console.log(response);
        // const { data } = response;
        // setCookie();
        // console.log(data);
      })
      .catch(err => {
        console.log("error");
        dispatch(
          loginFail({ status: false, error: true, msg: "Invalid Data..!" })
        );
      });
  };
};

export const isLoginCheck = param => {
  return (dispatch, getState) => {
    //# HERE MAKE ASYNC CALLS

    axios
      .post("/api/authentication/isLoggedIn", "", { withCredentials: true })
      .then(res => {
        console.log("125;isLogin", res);
        const { data } = res;
        dispatch(loginSuccess(data));
      })
      .catch(err => {
        console.log("133;isLogin", err);
      });
  };
};
const logout = () => {
  return {
    type: actionTypes.LOGOUT
  };
};
export const onLogout = () => {
  return (dispatch, getState) => {
    // cookies.removeItem("token");
    // setAxiosHeader();
    axios
      .get("/api/authentication/logout", { withCredentials: true })
      .then(response => {
        console.log(response);
        dispatch(logout());
      })
      .catch(err => {
        console.log("[-LOGOUT-]: ", err);
      });
  };
};

export const setAuthReturnRoute = route => {
  return {
    type: actionTypes.SET_AUTH_RETURN_ROUTE,
    payload: { route }
  };
};
