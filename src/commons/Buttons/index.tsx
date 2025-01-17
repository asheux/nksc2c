import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";

import { styled } from "@mui/material/styles";

export const StyledButton = styled(Button)<ButtonProps>(
  ({ theme, disabled }) => ({
    color: theme.palette.getContrastText("#000"),
    backgroundColor: disabled ? "#ffedeb" : "#b00f00",
    "&:hover": {
      backgroundColor: "#970d00",
      color: "white",
    },
    size: "medium",
    textTransform: "none",
    paddingLeft: "15px",
    paddingRight: "15px",
    fontSize: "12px",
  }),
);

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const CustomizedUpload = (props) => {
  const { handleChange, disabled } = props;

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      fullWidth
      disabled={disabled}
      sx={{
        color: "white",
        backgroundColor: "#b00f00",
        "&:hover": {
          backgroundColor: "#b00f00",
        },
      }}
    >
      Continue
      <VisuallyHiddenInput onChange={handleChange} type="file" accept=".nb" />
    </Button>
  );
};
