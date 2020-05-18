import * as actionTypes from "../action/actionTypes";
import { updateObject } from "../../asset/utility";

// import { message } from "antd";

const initialState = {
  loaded: false,
  loading: false,
  error: null,
  data: null,
  selectedSport: null,
  selectedSportName: null,
  editSportSelect: false
};

//# HERE IS THE REDUCER OR CASE'S
const sportReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.INIT_SPORT:
      return initSport(state, payload);

    case actionTypes.FETCH_SPORT_SUCCESS:
      return sportsSuccess(state, payload);

    case actionTypes.FETCH_SPORT_FAIL:
      return sportsFail(state, payload);
    case actionTypes.SELECT_SPORT:
      return selectSport(state, payload);
    case actionTypes.EDIT_SPORT_CART:
      return editSport(state, payload);
    case actionTypes.CLEAR_SPORT:
      return clearSport(state, payload);
    default:
      return state;
  }
};

/*--- CASES ARE HERE DEFINED */
// UTILITY FUNCTION CALCULATE UTILIZATION

const clearSport = (state, payload) => {
  return updateObject(state, {
    loaded: false,
    loading: false,
    error: null,
    data: null,
    selectedSport: null,
    selectedSportName: null,
    editSportSelect: false
  });
};
const editSport = (state, payload) => {
  return updateObject(state, {
    selectedSport: parseInt(payload.id),
    selectedSportName: payload.name,
    loaded: false,
    loading: false,
    error: null,
    data: null,
    editSportSelect: true
  });
};
const selectSport = (state, payload) => {
  return updateObject(state, {
    selectedSport: parseInt(payload.id),
    selectedSportName: payload.name
  });
};

const initSport = (state, payload) => {
  return updateObject(state, {
    loading: true
  });
};

//---------------------------------------------------------------------------------
const sportsSuccess = (state, payload) => {
  return updateObject(state, {
    loading: false,
    loaded: true,
    data: payload.data
  });
};
const sportsFail = (state, payload) => {
  return updateObject(state, {
    loaded: false,
    loading: false,
    error: payload.error
  });
};

export default sportReducer;
