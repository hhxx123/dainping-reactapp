import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./modules";
import api from "./middleware/api"
//開發環境集成redux-devtools
let store;
if (
  process.env.NODE_ENV !== "production" &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__;
  store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk,api)));
} else {
  store = createStore(rootReducer, applyMiddleware(thunk,api));
}
export default store;
