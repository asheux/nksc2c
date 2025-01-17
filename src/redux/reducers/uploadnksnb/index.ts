import initState from "../initState";
import { createAppSlice } from "../slice";

export const uploadnksnbSlice = createAppSlice(
  "uploadnksnb",
  initState.payload.uploadnksnb,
);

export default uploadnksnbSlice.reducer;
