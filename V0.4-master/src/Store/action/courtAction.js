import * as actionTypes from "./actionTypes";
import { API } from "../../utils/api";
import qs from "qs";

const initCourt = data => {
  return {
    type: actionTypes.INIT_COURT
  };
};
const courtSuccess = (data, obj) => {
  return {
    type: actionTypes.FETCH_COURT_SUCCESS,
    payload: { data, obj }
  };
};
const courtFail = error => {
  return {
    type: actionTypes.FETCH_COURT_FAIL,
    payload: { error }
  };
};

export const initCourtAsync = (params, obj) => {
  //# HERE WE CREATE DYNMAIC ACTION DISPATCHER FOR ALL CASE'S
  //# IF ID PASS THEN ACCORDING TO ID ARENAS RETURN OTHERWISE
  //# RETURN ALL
  const query = {
    arena_id: params && params.arenaId ? parseInt(params.arenaId) : 0,
    sports_id: params && params.sportId ? parseInt(params.sportId) : 0
  };
  
  return (dispatch, getState) => {
    //# HERE MAKE ASYNC CALLS.
    dispatch(initCourt());
    API.post("sports/getCourts", qs.stringify(query))
      .then(response => {
        // console.log("court succesS: ", response);
        const { data } = response.data;
        dispatch(courtSuccess(data, obj));
        // if (obj) {
        //   dispatch(selectCourt(obj));
        // }
      })
      .catch(err => {
        console.log("court error", err);
        dispatch(courtFail(err));
      });
  };
};

export const selectCourt = ({ id, name }) => {
  return {
    type: actionTypes.SELECT_COURT,
    payload: {
      id,
      name
    }
  };
};
export const editCourt = ({ id, name }) => {
  return {
    type: actionTypes.EDIT_COURT_CART,
    payload: {
      id,
      name
    }
  };
};

export const clearCourt = () => {
  return {
    type: actionTypes.CLEAR_COURT
  };
};
