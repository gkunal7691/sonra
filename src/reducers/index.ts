import storeTheSearch from "./storeSearch";
import storeTheSearchData from "./storeSeachedData";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  storeTheSearch,
  storeTheSearchData
});
export default rootReducer;
