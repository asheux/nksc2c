import React, { useState } from "react";
import {
  Modal,
  Typography,
  Box,
  CircularProgress,
  Stack,
  Checkbox,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { StyledButton } from "src/commons/Buttons";
import { StyledInput } from "src/commons/Inputs";
import { NKSTooltip } from "src/commons/Tooltip";
import { customStyles } from "src/styles";
import { isMobile } from "src/helpers";
import { useAppSelector } from "src/hooks";

const mathematica_icon = "/icons/mathematica.svg";

export const NKSC2CModal = (props) => {
  const {
    open,
    handleClose,
    loading,
    handleChange,
    errors,
    errorMessages,
    isLinked,
    handleCheckboxChange,
    payload,
    modaldata,
    setModalData,
    resetData,
    selectedId,
    handleOpenBook,
    handleSubmitNksContrib,
    token,
    handleUploadChange,
  } = props;
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const nkscontributor = useAppSelector((state) => state.nkscontributor);

  const handleOpenSocialLink = () => {
    const link = modaldata.social_link;
    if (link) {
      window.open(link, "_blank");
    }
  };

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleConfirmUpload = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleNotebookDownload = () => {
    window.open(modaldata.notebook_link);
  };

  return (
    <Modal
      open={open}
      aria-labelledby="nksc2c-code"
      aria-describedby="nksc2c-code-desc"
      sx={{ zIndex: 1302 }}
    >
      <Stack
        spacing={1}
        sx={{
          ...customStyles.modal,
          position: "relative",
        }}
      >
        <CloseIcon
          onClick={() => {
            handleClose();
            resetData();
            handleCloseForm();
          }}
          sx={{
            cursor: "pointer",
            float: "right",
            position: "absolute",
            right: 10,
            top: 10,
          }}
        />
        <Stack>
          <Typography
            variant={isMobile ? "h2" : "h4"}
            sx={{ color: "#b00f00" }}
          >
            Contribute Code
          </Typography>
          {modaldata.name ? (
            <Stack direction="row" spacing={0.5}>
              <Typography variant="body2">Contributed by:</Typography>
              <NKSTooltip
                title={
                  modaldata.social_link
                    ? "Open social account"
                    : "No social account"
                }
              >
                <Typography
                  onClick={handleOpenSocialLink}
                  variant="body2"
                  sx={{
                    textTransform: "capitalize",
                    cursor: "pointer",
                    color: "#4da6ff",
                  }}
                >
                  {modaldata.name}
                </Typography>
              </NKSTooltip>
            </Stack>
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontStyle: "italic",
                fontSize: isMobile ? 27 : 12,
              }}
            >
              No contribution has been made on this notebook
            </Typography>
          )}
        </Stack>
        <Divider />
        <Box>
          <Typography variant={isMobile ? "h4" : "h6"}>
            NKS Book Details
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: isMobile ? 27 : 16,
              mt: 1,
            }}
          >
            Figure name: {modaldata.notebook_name}
          </Typography>
          <Stack
            direction="row"
            sx={{
              color: "#4da6ff",
            }}
          >
            <Typography
              onClick={handleOpenBook}
              sx={{ fontSize: isMobile ? 30 : 14, cursor: "pointer" }}
            >
              Go to NKS page
            </Typography>
            <OpenInNewIcon sx={{ fontSize: 16 }} />
          </Stack>
        </Box>
        {!selectedId && (
          <>
            <Box>
              <StyledButton
                onClick={handleOpenForm}
                sx={{
                  mt: 1,
                  ...customStyles.buttonStyle,
                  borderRadius: 0,
                  backgroundColor: "white",
                  color: "#b00f00",
                  border: "1px solid #b00f00",
                  "&:hover": {
                    backgroundColor: "#970d00",
                    color: "white",
                  },
                }}
              >
                Would you like to try this?
              </StyledButton>
            </Box>
            {openForm && (
              <Stack spacing={2} sx={{ width: "100%" }}>
                <Box>
                  <Typography variant={isMobile ? "h4" : "h6"}>
                    Contributor Details
                  </Typography>
                  <Typography
                    sx={{
                      fontStyle: "italic",
                      fontSize: isMobile ? 27 : 12,
                    }}
                    variant="body2"
                    color="text.secondary"
                  >
                    Helps to know who worked or is working on this notebook.
                  </Typography>
                </Box>
                <Stack spacing={1}>
                  <StyledInput
                    id="name"
                    placeholder="Enter your name"
                    name="name"
                    size="small"
                    required
                    onChange={handleChange}
                    error={errors.name}
                    helperText={errors.name && errorMessages.name}
                    sx={{
                      width: "70%",
                      "& .MuiOutlinedInput-input": {
                        fontSize: isMobile ? "27px" : "14px",
                      },
                    }}
                  />
                  <Stack direction="row" alignItems="center">
                    <Checkbox
                      checked={isLinked}
                      onChange={handleCheckboxChange}
                      size={isMobile ? "large" : "small"}
                      inputProps={{ "aria-label": "controlled" }}
                      sx={{
                        color: "#b00f00",
                        "&.Mui-checked": {
                          color: "#b00f00",
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: isMobile ? 27 : 14,
                      }}
                      variant="body2"
                      color="text.secondary"
                    >
                      Link social account to your name
                    </Typography>
                  </Stack>
                  {isLinked && (
                    <StyledInput
                      id="social_link"
                      placeholder="Social profile link"
                      name="social_link"
                      required
                      size="small"
                      onChange={handleChange}
                      error={errors.social_link}
                      helperText={
                        errors.social_link && errorMessages.social_link
                      }
                      sx={{
                        width: "70%",
                        "& .MuiOutlinedInput-input": {
                          fontSize: isMobile ? "27px" : "14px",
                        },
                      }}
                    />
                  )}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontStyle: "italic",
                      fontSize: isMobile ? 27 : 12,
                    }}
                  >
                    Please note that by clicking the button below, you will be
                    the sole contributor and noone else can work on this
                    notebook.
                  </Typography>
                  <Box>
                    <StyledButton
                      disabled={errors.name}
                      onClick={handleSubmitNksContrib}
                      startIcon={
                        nkscontributor.loading ? (
                          <CircularProgress
                            variant="indeterminate"
                            disableShrink
                            sx={{ color: "#ffffff" }}
                            size={customStyles.spinnerSize}
                            thickness={4}
                          />
                        ) : (
                          ""
                        )
                      }
                      sx={{
                        fontSize: isMobile ? 30 : 12,
                        borderRadius: 0,
                      }}
                    >
                      Start work on the notebook
                    </StyledButton>
                  </Box>
                </Stack>
              </Stack>
            )}
          </>
        )}
        {token && (
          <>
            <Divider />
            <Stack>
              <Typography variant="h4">{token}</Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: isMobile ? 27 : 14,
                  color: "green",
                }}
              >
                Save this upload token to use during notebook upload.
              </Typography>
            </Stack>
          </>
        )}
        <Divider />
        <Stack direction="row" alignItems="center" spacing={0.2}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontStyle: "italic",
              fontSize: isMobile ? 27 : 16,
            }}
          >
            Information
          </Typography>
          <NKSTooltip title="Download notebook: Before you start working on a notebook, please download an empty version below or download to see what another contributor has done. Upload notebook: This option is for the contributor working on this notebook.">
            <InfoIcon sx={{ fontSize: isMobile ? 27 : 18, color: "#b00f00" }} />
          </NKSTooltip>
        </Stack>
        <Box>
          <StyledButton
            onClick={handleNotebookDownload}
            startIcon={
              <Box
                component="img"
                src={mathematica_icon}
                sx={{
                  width: isMobile ? 30 : 20,
                  height: isMobile ? 30 : 20,
                }}
              />
            }
            sx={{
              ...customStyles.buttonStyle,
              borderRadius: 0,
              float: "left",
              backgroundColor: "white",
              color: "#b00f00",
              border: "1px solid #b00f00",
            }}
          >
            Download notebook
          </StyledButton>
          <StyledButton
            onClick={handleConfirmUpload}
            startIcon={
              <Box
                component="img"
                src={mathematica_icon}
                sx={{
                  width: isMobile ? 30 : 20,
                  height: isMobile ? 30 : 20,
                }}
              />
            }
            sx={{
              ...customStyles.buttonStyle,
              borderRadius: 0,
              backgroundColor: "white",
              float: "right",
              color: "#b00f00",
              border: "1px solid #b00f00",
            }}
          >
            Upload notebook
          </StyledButton>
        </Box>
        <Modal
          open={openConfirm}
          onClose={handleCloseConfirm}
          aria-labelledby="token-code"
          aria-describedby="token-code-desc"
          sx={{ zIndex: 1302 }}
        >
          <Stack
            spacing={2}
            sx={{ ...customStyles.tokenModal, position: "relative" }}
          >
            <CloseIcon
              onClick={handleCloseConfirm}
              sx={{
                cursor: "pointer",
                float: "right",
                position: "absolute",
                right: 10,
                top: 10,
              }}
            />
            <Stack direction="row" alignItems="center" spacing={0.2}>
              <Typography variant={isMobile ? "h4" : "h6"}>
                Add upload token
              </Typography>
              <NKSTooltip title="This is the token provided to you when you started work on this notebook. If you lost it, please contact asheuh49@gmail.com">
                <InfoIcon
                  sx={{ fontSize: isMobile ? 27 : 20, color: "#b00f00" }}
                />
              </NKSTooltip>
            </Stack>
            <StyledInput
              id="token"
              placeholder="928398382"
              name="token"
              size="small"
              fullWidth
              required
              onChange={handleUploadChange}
              error={errors.token}
              helperText={errors.token && errorMessages.token}
              sx={{
                "& .MuiOutlinedInput-input": {
                  fontSize: isMobile ? "27px" : "14px",
                },
              }}
            />
            <Box>
              <StyledButton
                disabled={errors.name}
                sx={{
                  fontSize: isMobile ? 30 : 12,
                  width: isMobile ? "30%" : "20%",
                  borderRadius: 0,
                  float: "right",
                }}
              >
                {loading ? (
                  <CircularProgress
                    variant="indeterminate"
                    disableShrink
                    sx={{ color: "#b00f00" }}
                    size={customStyles.spinnerSize}
                    thickness={4}
                  />
                ) : (
                  "Continue"
                )}
              </StyledButton>
            </Box>
          </Stack>
        </Modal>
      </Stack>
    </Modal>
  );
};
