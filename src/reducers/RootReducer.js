import {combineReducers} from "redux";
import orgs from "./OrgsReducer";

export default function rootReducer(state, action) {
  const appReducer = combineReducers({
    orgs,
  });
  return appReducer(state, action);
}
