import { uploadNKSNotebook } from "./uploadnksnb.api";
import { uploadnksnbSlice } from "src/redux/reducers/uploadnksnb";

export const uploadnksnbAction = (data) => (dispatch) => {
  const { request, failure, success } = uploadnksnbSlice.actions;

  dispatch(request());
  return uploadNKSNotebook(data)
    .then((res) => {
      if (res?.error) {
        return dispatch(failure(res?.error));
      } else if (res?.data) {
        return dispatch(success(res.data));
      }
    })
    .catch((error) => dispatch(failure(error)));
};
