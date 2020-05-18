import * as actionTypes from "./actionTypes";
import { API } from "../../utils/api";
// import qs from "qs";

const initSport = () => {
  return {
    type: actionTypes.INIT_SPORT
  };
};
const sportsSuccess = data => {
  return {
    type: actionTypes.FETCH_SPORT_SUCCESS,
    payload: { data }
  };
};
const sportsFail = error => {
  return {
    type: actionTypes.FETCH_SPORT_FAIL,
    payload: { error }
  };
};
export const initSportAsync = obj => {
  return (dispatch, getState) => {
    //TODO# HERE MAKE ASYNC CALLS.

    dispatch(initSport());

    API.post("ui/getAllSports")
      .then(response => {
        const { data } = response.data;

        dispatch(sportsSuccess(data));
        if (obj) {
          dispatch(selectSport(obj));
        }
      })
      .catch(err => {
        dispatch(sportsFail(err));
      });
  };
};

export const selectSport = ({ id, name }) => {
  return {
    type: actionTypes.SELECT_SPORT,
    payload: {
      id,
      name
    }
  };
};

export const editSport = ({ id, name }) => {
  return {
    type: actionTypes.EDIT_SPORT_CART,
    payload: {
      id,
      name
    }
  };
};

export const clearSport = () => {
  return {
    type: actionTypes.CLEAR_SPORT
  };
};
