import initState from "../initState";
import { createAppSlice } from "../slice";

export const uploadnksnbSlice = createAppSlice(
  "nksc2cupload",
  initState.payload.nksc2cupload,
);

export default uploadnksnbSlice.reducer;
