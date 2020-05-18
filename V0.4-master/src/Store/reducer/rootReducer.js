import { combineReducers } from "redux";

import sport from "./sportReducer";
import arena from "./arenaReducer";
import court from "./courtReducer";
import slots from "./slotReducer";
import cart from "./cartReducer";
import auth from "./authReducer";

const rootReducer = combineReducers({
  sportReducer: sport,
  arenaReducer: arena,
  courtReducer: court,
  slotReducer: slots,
  cartReducer: cart,
  authReducer: auth
});

export default rootReducer;
