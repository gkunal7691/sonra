import storeTheSearch from "./storeSearch";
import storeTheSearchData from "./storeSeachedData";
import storeThePage from "./storePage";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  storeTheSearch,
  storeTheSearchData,
  storeThePage
});
export default rootReducer;
