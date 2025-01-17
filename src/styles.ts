import { isMobile } from "src/helpers";

export const customStyles = {
  centerStuff: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  loaderStyle: {
    fontSize: isMobile ? 30 : 20,
    color: "#35495E",
  },
  tccupName: {
    mr: 2,
    display: { xs: "none", md: "flex" },
    letterSpacing: ".3rem",
    color: "inherit",
    flexGrow: 1,
  },
  buttonStyle: {
    fontSize: isMobile ? 25 : 12,
  },
  boldText: {
    fontWeight: 700,
  },
  spinnerSize: isMobile ? 40 : 16,
  inputBase: {
    ml: 1,
    flex: 1,
    "& input::placeholder": {
      fontSize: isMobile ? 40 : 14,
    },
    "& input": {
      fontSize: isMobile ? 40 : 14,
    },
  },
  modal: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    width: isMobile ? "80%" : 450,
  },
  tokenModal: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    width: isMobile ? "50%" : 300,
  },
};
