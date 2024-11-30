import { addNKScontributor } from "./nkscontributor.api";
import { nkscontributorSlice } from "src/redux/reducers/nkscontributor";

export const nkscontributorAction = (data) => (dispatch) => {
  const { request, failure, success } = nkscontributorSlice.actions;

  dispatch(request());
  return addNKScontributor(data)
    .then((res) => {
      if (res?.error) {
        return dispatch(failure(res?.error));
      } else if (res?.data) {
        return dispatch(success(res.data));
      }
    })
    .catch((error) => dispatch(failure(error)));
};
