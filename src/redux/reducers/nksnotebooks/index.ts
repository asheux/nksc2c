import initState from "../initState";
import { createAppSlice } from "../slice";

export const nksNotebooksSlice = createAppSlice(
  "nksnotebooks",
  initState.payload.nksnotebooks,
);

export default nksNotebooksSlice.reducer;
