import { getNKSNotebooks } from "./nksnotebooks.api";
import { nksNotebooksSlice } from "src/redux/reducers/nksnotebooks";

export const nksNotebooksAction = () => (dispatch) => {
  const { request, failure, success } = nksNotebooksSlice.actions;

  dispatch(request());
  return getNKSNotebooks()
    .then((res) => {
      if (res?.error) {
        return dispatch(failure(res.error));
      } else if (res?.data) {
        return dispatch(success(res));
      } else {
        return dispatch(failure(res));
      }
    })
    .catch((error) => dispatch(failure(error)));
};
