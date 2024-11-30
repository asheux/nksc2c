import { combineReducers } from "redux";
import nkscontributorReducer from "./nkscontributor";
import nksnotebooksReducer from "./nksnotebooks";

const rootReducer = combineReducers({
  nkscontributor: nkscontributorReducer,
  nksnotebooks: nksnotebooksReducer,
});

export default rootReducer;
