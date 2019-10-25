import { combineReducers } from "redux";
import { crews } from "./crews";
import { location } from "./location";

export default combineReducers({
  crews,
  location
});
