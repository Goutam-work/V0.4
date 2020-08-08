import * as actionTypes from "./actionTypes";
import { API } from "../../utils/api";
import qs from "qs";

const initSlot = data => {
  return {
    type: actionTypes.INIT_SLOT
  };
};
const slotSuccess = data => {
  return {
    type: actionTypes.FETCH_SLOT_SUCCESS,
    payload: { data }
  };
};
const slotFail = error => {
  return {
    type: actionTypes.FETCH_SLOT_FAIL,
    payload: { error }
  };
};

export const initSlotAsync = (params, selectedSlots) => {
  //# HERE WE CREATE DYNMAIC ACTION DISPATCHER FOR ALL CASE'S
  //# IF ID PASS THEN ACCORDING TO ID ARENAS RETURN OTHERWISE
  //# RETURN ALL

  const query = {
    court_id: params && params.courtId ? parseInt(params.courtId) : 0,
    book_date: params && params.bookingDate ? params.bookingDate : new Date().toISOString().slice(0,10)
  };
  return (dispatch, getState) => {
    //# HERE MAKE ASYNC CALLS.
    dispatch(initSlot());

    console.log(
      selectedSlots,
      "-------------------------------------slot fetch"
    );
    API.post("sports/getCourtSlots", qs.stringify(query))
      .then(response => {
        const { data } = response.data;
        const newData = data.map(element => {
          return Object.assign(element, {
            selected:
              selectedSlots &&
              selectedSlots.find(ele => element.slot_id === ele.slot_id)
                ? selectedSlots.find(ele => element.slot_id === ele.slot_id)
                    .selected
                : false
          });
        });
        dispatch(slotSuccess(newData));
      })
      .catch(err => {
        dispatch(slotFail(err));
      });
  };
};

export const selectSlot = slot => {
  return {
    type: actionTypes.SELECT_SLOT,
    payload: {
      slot
    }
  };
};

export const deSelectSlot = slot => {
  return {
    type: actionTypes.DE_SELECT_SLOT,
    payload: {
      slot
    }
  };
};
export const clearSlots = slot => {
  return {
    type: actionTypes.CLEAR_SLOTS
  };
};

export const setEditSlot = data => {
  return {
    type: actionTypes.SET_EDIT_SLOT,
    payload: { data }
  };
};

export const setDate = data => {
  return {
    type: actionTypes.SET_DATE,
    payload: { data }
  };
};
