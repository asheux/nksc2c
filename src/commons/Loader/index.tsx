import React from "react";

import { Typography, Box, Stack } from "@mui/material";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";

import { isMobile } from "src/helpers";
import { customStyles } from "src/styles";

export const Spinner = () => {
  return (
    <Box sx={{ ...customStyles.centerStuff, position: "absolute" }}>
      <Typography sx={customStyles.loaderStyle}>Loading...</Typography>
    </Box>
  );
};

export const LinearProgressWithLabel = (
  props: LinearProgressProps & { value: number },
) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#03abe2",
            },
          }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          sx={{ color: "#ffffff", fontSize: isMobile ? 27 : 12 }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};

export const Loader = (props) => {
  const { size, offset, numberOfBars } = props;

  const bars = [];
  for (let index = 0; index < numberOfBars; index++) {
    bars.push(<LinearProgress color="inherit" key={index} />);
  }

  return (
    <>
      <Stack
        sx={{
          mr: offset,
          width: size,
          color: "gray",
        }}
        spacing={1}
      >
        {bars}
      </Stack>
    </>
  );
};
