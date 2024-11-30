import { Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledToolbar = styled(Toolbar)(() => ({
  position: "sticky",
  ["@media (min-width:0px)"]: {
    minHeight: "50px",
  },
}));
