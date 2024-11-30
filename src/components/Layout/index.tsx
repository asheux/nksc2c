// External imports
import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";

// App related imports
import Footer from "src/commons/Footer";
import { StyledToolbar } from "src/commons/Toolbar";
import { isMobile } from "src/helpers";
import { customStyles } from "src/styles";

const nks_logo = "/images/nks-book.png";

const Layout = (props) => {
  const {
    children
  } = props;
  const theme = useTheme();

  return (
    <React.Fragment>
      <AppBar
        component="nav"
        sx={{
          boxShadow: 1,
          backgroundColor: theme.palette.primary.main,
          zIndex: 10,
        }}
      >
        <Container maxWidth="xl">
          <StyledToolbar disableGutters sx={isMobile ? { height: 150 } : {}}>
            <Box component="div" sx={customStyles.tccupName}>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: theme.palette.text.primary,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <img
                    className="questlist_logo"
                    src={nks_logo}
                    height={isMobile ? "80px" : "30px"}
                    width={isMobile ? "80px" : "30px"}
                  />
                  <Typography
                    sx={{
                      fontSize: isMobile ? 45 : 22,
                      fontWeight: 500,
                    }}
                  >
                    NKS C2C Code
                  </Typography>
                </Stack>
              </Link>
            </Box>
          </StyledToolbar>
        </Container>
      </AppBar>
      {children}
    </React.Fragment>
  );
};

export default Layout;
