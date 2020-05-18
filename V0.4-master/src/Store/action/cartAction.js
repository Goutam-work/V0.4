import * as actionTypes from "./actionTypes";

export const addToCart = data => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: { data }
  };
};
export const clearCart = data => {
  return {
    type: actionTypes.DELETE_CART
  };
};
export const removeFromCart = id => {
  return {
    type: actionTypes.REMOVE_CART_ITEM,
    payload: {
      id
    }
  };
};
export const editCartStore = data => {
  return {
    type: actionTypes.EDIT_CART_ITEM,
    payload: {
      data
    }
  };
};
export const setCartStore = param => {
  return {
    type: actionTypes.SET_CART_ITEM,
    payload: {
      value: param.value,
      data: param.data
    }
  };
};
