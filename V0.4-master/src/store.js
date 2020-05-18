import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const defaultState = {
  products,
  user
};

export const store = createStore(
  rootReducer,
  defaultState,
  applyMiddleware(thunk)
);
