import * as actionTypes from "../action/actionTypes";
import { updateObject } from "../../asset/utility";

// import { message } from "antd";

const initialState = {
  loaded: false,
  loading: false,
  error: null,
  data: null,
  selectedSlots: [],
  total: 0,
  totalDisplay: {}
};

//# HERE IS THE REDUCER OR CASE'S
const slotReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.INIT_SLOT:
      return initSlot(state, payload);

    case actionTypes.FETCH_SLOT_SUCCESS:
      return slotsSuccess(state, payload);

    case actionTypes.FETCH_SLOT_FAIL:
      return slotsFail(state, payload);
    case actionTypes.SELECT_SLOT:
      return selectSlot(state, payload);
    case actionTypes.DE_SELECT_SLOT:
      return deSelectSlot(state, payload);
    case actionTypes.CLEAR_SLOTS:
      return clearSlot(state, payload);
    case actionTypes.SET_EDIT_SLOT:
      return setEditSlot(state, payload);
    default:
      return state;
  }
};

/*--- CASES ARE HERE DEFINED */
// UTILITY FUNCTION CALCULATE UTILIZATION
const setEditSlot = (state, { data }) => {
  return updateObject(state, {
    selectedSlots: data.slots,
    total: data.total,
    totalDisplay: data.totalDisplay
  });
};
const clearSlot = (state, payload) => {
  return updateObject(state, {
    loaded: false,
    loading: false,
    error: null,
    data: null,
    selectedSlots: [],
    total: 0,
    totalDisplay: {}
  });
};
const selectSlot = (state, payload) => {
  let prevTotal = state.total;
  const data = state.data.map(element => {
    const newSelectedState =
      parseInt(payload.slot.slot_id) === parseInt(element.slot_id)
        ? true
        : element.selected;
    return Object.assign(element, { selected: newSelectedState });
  });

  const newSelectArray = [...state.selectedSlots];
  newSelectArray.push(payload.slot);
  const newTotal = prevTotal + payload.slot.slot_cost;
  const newTotalDisplay = { ...state.totalDisplay };

  if (newTotalDisplay[payload.slot.slot_cost]) {
    newTotalDisplay[payload.slot.slot_cost] =
      newTotalDisplay[payload.slot.slot_cost] + 1;
  } else {
    newTotalDisplay[payload.slot.slot_cost] = 1;
  }
  return updateObject(state, {
    selectedSlots: newSelectArray,
    data,
    total: newTotal,
    totalDisplay: newTotalDisplay
  });
};
const deSelectSlot = (state, payload) => {
  let prevTotal = state.total;
  const data = state.data.map(element => {
    const newSelectedState =
      parseInt(payload.slot.slot_id) === parseInt(element.slot_id)
        ? false
        : element.selected;
    return Object.assign(element, { selected: newSelectedState });
  });
  const newSelectArray = [...state.selectedSlots];
  const updateArray = newSelectArray.filter(element => {
    return parseInt(payload.slot.slot_id) !== parseInt(element.slot_id);
  });
  const newTotal = prevTotal - payload.slot.slot_cost;

  const newTotalDisplay = { ...state.totalDisplay };

  if (newTotalDisplay[payload.slot.slot_cost]) {
    newTotalDisplay[payload.slot.slot_cost] =
      newTotalDisplay[payload.slot.slot_cost] - 1;
  }
  return updateObject(state, {
    selectedSlots: updateArray,
    data,
    total: newTotal,
    totalDisplay: newTotalDisplay
  });
};

const initSlot = (state, payload) => {
  return updateObject(state, {
    loading: true,
    loaded: false
  });
};

//---------------------------------------------------------------------------------
const slotsSuccess = (state, payload) => {
  return updateObject(state, {
    loading: false,
    loaded: true,
    data: payload.data
  });
};
const slotsFail = (state, payload) => {
  return updateObject(state, {
    loaded: false,
    loading: false,
    error: payload.error
  });
};

export default slotReducer;
