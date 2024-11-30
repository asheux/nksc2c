import initState from "../initState";
import { createAppSlice } from "../slice";

export const nkscontributorSlice = createAppSlice(
  "nkscontributor",
  initState.payload.nkscontributor,
);

export default nkscontributorSlice.reducer;
