import React from "react";
import { Box, Fade, Toolbar, Typography } from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { styled } from "@mui/material/styles";

import { isMobile } from "src/helpers";
import { customStyles } from "src/styles";
import { StyledButton } from "src/commons/Buttons";

interface Props {
  children: React.ReactElement;
}

export const StyledToolbar = styled(Toolbar)(() => ({
  position: "sticky",
  ["@media (min-width:0px)"]: {
    minHeight: "50px",
  },
}));
