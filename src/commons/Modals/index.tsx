import React, { useState } from "react";
import {
  Modal,
  Typography,
  Box,
  CircularProgress,
  Stack,
  Checkbox,
  Divider,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { StyledButton, CustomizedUpload } from "src/commons/Buttons";
import { StyledInput, ShowError } from "src/commons/Inputs";
import { NKSTooltip } from "src/commons/Tooltip";
import { customStyles } from "src/styles";
import { isMobile, statusMap, colorMap } from "src/helpers";
import { useAppSelector } from "src/hooks";
import { AWS_S3 } from "src/api";

const mathematica_icon = "/icons/mathematica.svg";

export const NKSC2CModal = (props) => {
  const {
    open,
    handleClose,
    handleChange,
    errors,
    errorMessages,
    isLinked,
    handleCheckboxChange,
    modaldata,
    resetData,
    selectedId,
    handleOpenBook,
    handleSubmitNksContrib,
    token,
    handleUploadChange,
    handleUpload,
    disabledUpload,
    isUploading,
    openConfirm,
    handleCloseConfirm,
    handleConfirmUpload,
    uploadHasErrors,
    uMessage,
    uploadSuccess,
  } = props;
  const [openForm, setOpenForm] = useState(false);

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

  const handleNotebookDownload = () => {
    window.open(`${AWS_S3}/${modaldata.notebook_name}.nb`);
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
            fontSize: isMobile ? 45 : 20,
          }}
        />
        <Stack>
          <Typography
            variant={isMobile ? "h3" : "h4"}
            sx={{ color: "#b00f00" }}
          >
            {modaldata.name ? "NKS Click to Copy Code" : "Contribute Code"}
          </Typography>
          {modaldata.name ? (
            <Stack direction="row" spacing={0.5}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: isMobile ? 27 : 14,
                }}
              >
                Contributed by:
              </Typography>
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
                    color: "#b00f00",
                    fontSize: isMobile ? 27 : 14,
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
          <Typography variant={isMobile ? "h4" : "h6"}>Status</Typography>
          <Chip
            label={statusMap[modaldata.status]}
            sx={{
              backgroundColor: colorMap[modaldata.status],
              borderRadius: 5,
              p: 1,
              color: "#fff",
              height: isMobile ? 50 : 35,
              ".MuiChip-label": {
                fontSize: isMobile ? 27 : 14,
              },
            }}
          />
        </Box>
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
              color: "#b00f00",
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
                      Start work on this notebook
                    </StyledButton>
                  </Box>
                </Stack>
              </Stack>
            )}
          </>
        )}
        {(token || uploadHasErrors || uploadSuccess) && (
          <>
            <Divider />
            <Stack>
              <Typography variant="h4">{token}</Typography>
              <ShowError
                show={!!token || uploadSuccess || uploadHasErrors}
                message={
                  uploadSuccess || uploadHasErrors
                    ? uMessage
                    : "Save this upload token to use during notebook upload."
                }
                showBorder={true}
                color={uploadHasErrors ? "red" : "green"}
              />
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
            {`Download ${modaldata.name ? "notebook" : "template"}`}
          </StyledButton>
          <StyledButton
            onClick={handleConfirmUpload}
            disabled={!modaldata.name || modaldata.status === "approved"}
            startIcon={
              isUploading ? (
                <CircularProgress
                  variant="indeterminate"
                  disableShrink
                  sx={{ color: "#b00f00" }}
                  size={customStyles.spinnerSize}
                  thickness={4}
                />
              ) : (
                <Box
                  component="img"
                  src={mathematica_icon}
                  sx={{
                    width: isMobile ? 30 : 20,
                    height: isMobile ? 30 : 20,
                  }}
                />
              )
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
            {isUploading ? "Uploading" : "Upload"} notebook
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
            sx={{
              ...customStyles.tokenModal,
              position: "relative",
            }}
          >
            <CloseIcon
              onClick={handleCloseConfirm}
              sx={{
                cursor: "pointer",
                float: "right",
                position: "absolute",
                right: 10,
                top: 10,
                fontSize: isMobile ? 45 : 20,
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
              placeholder="398382"
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
            <Stack spacing={0.5}>
              <CustomizedUpload
                handleChange={handleUpload}
                disabled={disabledUpload}
              />
              <ShowError
                show={errors.file}
                message={errorMessages.file}
                showBorder={true}
                color={"red"}
              />
            </Stack>
          </Stack>
        </Modal>
      </Stack>
    </Modal>
  );
};
