import * as actionTypes from "../action/actionTypes";
import { updateObject } from "../../asset/utility";

// import { message } from "antd";

const initialState = {
  loaded: false,
  loading: false,
  error: null,
  data: null,
  selectedCourt: null,
  selectedCourtName: null,
  editCourtSelect: false
};

//# HERE IS THE REDUCER OR CASE'S
const courtReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.INIT_COURT:
      return initCourt(state, payload);

    case actionTypes.FETCH_COURT_SUCCESS:
      return courtsSuccess(state, payload);

    case actionTypes.FETCH_COURT_FAIL:
      return courtsFail(state, payload);
    case actionTypes.SELECT_COURT:
      return selectCourt(state, payload);
    case actionTypes.EDIT_COURT_CART:
      return editCourt(state, payload);
    case actionTypes.CLEAR_COURT:
      return clearCourt(state, payload);
    default:
      return state;
  }
};

/*--- CASES ARE HERE DEFINED */
// UTILITY FUNCTION CALCULATE UTILIZATION

const clearCourt = (state, payload) => {
  return updateObject(state, {
    loaded: false,
    loading: false,
    error: null,
    data: null,
    selectedCourt: null,
    selectedCourtName: null,
    editCourtSelect: false
  });
};
const editCourt = (state, payload) => {
  return updateObject(state, {
    selectedCourt: parseInt(payload.id),
    selectedCourtName: payload.name,
    editCourtSelect: true
  });
};
const selectCourt = (state, payload) => {
  return updateObject(state, {
    selectedCourt: parseInt(payload.id),
    selectedCourtName: payload.name
  });
};

const initCourt = (state, payload) => {
  return updateObject(state, {
    loading: true,
    loaded: false
  });
};

//---------------------------------------------------------------------------------
const courtsSuccess = (state, { data, obj }) => {
  let slctCourtID = data && data.length > 0 ? data[0].court_id : 0;
  let slctCourtName =
    data && data.length > 0 ? data[0].court_name : "ALL COURTS";
  if (obj) {
    console.log("yes obj hai: ", obj);
    slctCourtID = obj.id;
    slctCourtName = obj.name;
  }
  return updateObject(state, {
    loading: false,
    loaded: true,
    data: data,
    selectedCourt: slctCourtID,
    selectedCourtName: slctCourtName,
    error: null
  });
};
const courtsFail = (state, payload) => {
  return updateObject(state, {
    loaded: false,
    loading: false,
    error: payload.error
  });
};

export default courtReducer;
