import * as actionTypes from "./actionTypes";
import { API } from "../../utils/api";
import qs from "qs";

const initArena = data => {
  return {
    type: actionTypes.INIT_ARENA
  };
};
const arenaSuccess = data => {
  return {
    type: actionTypes.FETCH_ARENA_SUCCESS,
    payload: { data }
  };
};
const arenaFail = error => {
  return {
    type: actionTypes.FETCH_ARENA_FAIL,
    payload: { error }
  };
};

export const initArenaAsync = params => {
  //# HERE WE CREATE DYNMAIC ACTION DISPATCHER FOR ALL CASE'S
  //# IF ID PASS THEN ACCORDING TO ID ARENAS RETURN OTHERWISE
  //# RETURN ALL

  const query = {
    sport: params && params.query ? parseInt(params.query) : 0
  };
  // console.log("Arena action", query);
  return (dispatch, getState) => {
    //# HERE MAKE ASYNC CALLS.
    dispatch(initArena());

    API.post("sports/getArena", qs.stringify(query))
      .then(response => {
        const { data } = response.data;
        dispatch(arenaSuccess(data));
        if (params && params.obj) {
          dispatch(selectArena(params.obj));
        }
      })
      .catch(err => {
        dispatch(arenaFail(err));
      });
  };
};

export const selectArena = ({ id, name }) => {
  return {
    type: actionTypes.SELECT_ARENA,
    payload: {
      id,
      name
    }
  };
};
export const editArena = ({ id, name }) => {
  return {
    type: actionTypes.EDIT_ARENA_CART,
    payload: {
      id,
      name
    }
  };
};
export const onCourtSelectArena = id => {
  return {
    type: actionTypes.ON_COURT_SELECT_ARENA,
    payload: {
      id
    }
  };
};

export const clearArena = () => {
  return {
    type: actionTypes.CLEAR_ARENA
  };
};
