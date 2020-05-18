import * as actionTypes from "../action/actionTypes";
import { updateObject } from "../../asset/utility";

// import { message } from "antd";

const initialState = {
  loaded: false,
  loading: false,
  error: null,
  data: null,
  selectedArena: null,
  selectedArenaName: null,
  courtSelectedArena: null,
  editArenaSelect: false
};

//# HERE IS THE REDUCER OR CASE'S
const arenaReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.INIT_ARENA:
      return initArena(state, payload);

    case actionTypes.FETCH_ARENA_SUCCESS:
      return arenasSuccess(state, payload);

    case actionTypes.FETCH_ARENA_FAIL:
      return arenasFail(state, payload);
    case actionTypes.SELECT_ARENA:
      return selectArena(state, payload);
    case actionTypes.EDIT_ARENA_CART:
      return editArena(state, payload);
    case actionTypes.CLEAR_ARENA:
      return clearArena(state, payload);
    case actionTypes.ON_COURT_SELECT_ARENA:
      return courtSelectArena(state, payload);
    default:
      return state;
  }
};

/*--- CASES ARE HERE DEFINED */
// UTILITY FUNCTION CALCULATE UTILIZATION

const clearArena = (state, payload) => {
  return updateObject(state, {
    loaded: false,
    loading: false,
    error: null,
    data: null,
    selectedArena: null,
    selectedArenaName: null,
    courtSelectedArena: null,
    editArenaSelect: false
  });
};
const editArena = (state, payload) => {
  return updateObject(state, {
    selectedArena: parseInt(payload.id),
    selectedArenaName: payload.name,
    loaded: false,
    loading: false,
    error: null,
    data: null,
    editArenaSelect: true
  });
};
const selectArena = (state, payload) => {
  return updateObject(state, {
    selectedArena: parseInt(payload.id),
    selectedArenaName: payload.name
  });
};
const courtSelectArena = (state, payload) => {
  return updateObject(state, {
    courtSelectedArena: parseInt(payload.id)
  });
};
const initArena = (state, payload) => {
  return updateObject(state, {
    loading: true
  });
};

//---------------------------------------------------------------------------------
const arenasSuccess = (state, payload) => {
  return updateObject(state, {
    loading: false,
    loaded: true,
    data: payload.data,
    selectedArena: payload.data[0].location_id,
    selectedArenaName: payload.data[0].ground_name
  });
};
const arenasFail = (state, payload) => {
  return updateObject(state, {
    loaded: false,
    loading: false,
    error: payload.error
  });
};

export default arenaReducer;
