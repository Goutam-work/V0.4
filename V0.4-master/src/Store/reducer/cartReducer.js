import * as actionTypes from "../action/actionTypes";
import { updateObject } from "../../asset/utility";
const getSelectedFromlocalStorage = JSON.parse(
  localStorage.getItem("cartList")
);
// import { message } from "antd";

const initialState = {
  data: getSelectedFromlocalStorage ? getSelectedFromlocalStorage : [],
  validData:
    getSelectedFromlocalStorage && getSelectedFromlocalStorage.length > 0
      ? true
      : false,
  editCartId: null,
  editData: null
};

//# HERE IS THE REDUCER OR CASE'S
const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_TO_CART:
      return addToCart(state, payload);

    case actionTypes.DELETE_CART:
      return clearCart(state, payload);
    case actionTypes.REMOVE_CART_ITEM:
      return removeFromCart(state, payload);
    case actionTypes.EDIT_CART_ITEM:
      return editCartItem(state, payload);
    case actionTypes.SET_CART_ITEM:
      return setCartItem(state, payload);
    default:
      return state;
  }
};

/*--- CASES ARE HERE DEFINED */
// UTILITY FUNCTION CALCULATE UTILIZATION
const setCartItem = (state, { value, data }) => {
  return updateObject(state, {
    editCartId: value,
    editData: data
  });
};
const addToCart = (state, payload) => {
  let localStorageCart = JSON.parse(localStorage.getItem("cartList"));

  if (!localStorageCart) {
    window.localStorage.setItem("cartList", JSON.stringify([]));
    localStorageCart = JSON.parse(localStorage.getItem("cartList"));
  }

  localStorageCart.push(payload.data);
  window.localStorage.setItem("cartList", JSON.stringify(localStorageCart));
  return updateObject(state, {
    data: localStorageCart,
    validData: localStorageCart && localStorageCart.length > 0 ? true : false
  });
};
const clearCart = (state, payload) => {
  window.localStorage.setItem("cartList", JSON.stringify([]));

  return updateObject(state, {
    data: null,
    validData: false
  });
};

const removeFromCart = (state, { id }) => {
  const localStorageCart = JSON.parse(localStorage.getItem("cartList"));
  console.log(localStorageCart, id);
  const updatelocalStorageCart = localStorageCart.filter(element => {
    return element.cartId !== id;
  });
  window.localStorage.setItem(
    "cartList",
    JSON.stringify(updatelocalStorageCart)
  );

  // const selected = updatelocalStorageCart;
  return updateObject(state, {
    data: updatelocalStorageCart,
    validData:
      updatelocalStorageCart && updatelocalStorageCart.length > 0 ? true : false
  });
};

const editCartItem = (state, { data }) => {
  const localStorageCart = JSON.parse(localStorage.getItem("cartList"));
  const updatelocalStorageCart = localStorageCart.filter(element => {
    return element.cartId !== data.cartId;
  });
  console.log("editcartitem:", updatelocalStorageCart);
  updatelocalStorageCart.push(data);
  console.log("editcartitem123:", updatelocalStorageCart);
  window.localStorage.setItem(
    "cartList",
    JSON.stringify(updatelocalStorageCart)
  );

  return updateObject(state, {
    data: updatelocalStorageCart,
    validData:
      updatelocalStorageCart && updatelocalStorageCart.length > 0 ? true : false
  });
};

export default cartReducer;
