import { combineReducers } from "redux";
import nkscontributorReducer from "./nkscontributor";
import nksnotebooksReducer from "./nksnotebooks";
import uploadNKSNbReducer from "./uploadnksnb";

const rootReducer = combineReducers({
  nkscontributor: nkscontributorReducer,
  nksnotebooks: nksnotebooksReducer,
  nksc2cupload: uploadNKSNbReducer,
});

export default rootReducer;
