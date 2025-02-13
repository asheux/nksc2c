// External imports
import React, { useState, useEffect, useRef } from "react";
import JSZip from "jszip";
import {
  Grid,
  Container,
  Typography,
  Box,
  Stack,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

// App related imports
import Layout from "src/components/Layout";
import { Loader } from "src/commons/Loader";
import { ImageCanvas, PageStatus } from "src/commons/Canvas";
import { NKSC2CModal } from "src/commons/Modals";
import { nksChapters, colorMap } from "src/helpers";
import { validateInput } from "src/commons/Inputs/validation";
import { parseErrorMessages, parseErrors } from "src/utils/parsePayload";
import { isMobile } from "src/helpers";
import { useAppSelector } from "src/hooks";
import initState from "src/redux/reducers/initState";

const nksbookimage = "/images/nks-book.png";

const PublicPage = (props) => {
  const { nkscontributorAction, nksNotebooksAction, uploadnksnbAction } = props;
  const [activeChapter, setActiveChapter] = useState(
    localStorage.chapter || "chapter00",
  );
  const [chapter, setChapter] = useState({
    id: localStorage.chapter_id,
    label: localStorage.chapter_label,
  });
  const [activeData, setActiveData] = useState({});
  const [imageCache, setImageCache] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [isLinked, setIsLinked] = useState(false);
  const [errors, setErrors] = useState(initState.errors);
  const [errorMessages, setErrorMessages] = useState(initState.errorMessages);
  const [payload, setPayload] = useState(initState.nkscontributor);
  const [modaldata, setModalData] = useState(initState.nkscontributor);
  const [selectedId, setSelectedId] = useState(null);
  const [notebooks, setNotebooks] = useState({});
  const [token, setToken] = useState("");
  const [uploadPayload, setUploadPayload] = useState(initState.uploadPayload);
  const [isUploading, setIsUploadinng] = useState(false);
  const [uploadHasErrors, setUploadHasErrors] = useState(false);
  const [uMessage, setUMessage] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedPageName, setSelectedPageName] = useState("");
  const mainContentRef = useRef<HTMLDivElement>(null);

  const nksnotebooks = useAppSelector((state) => state.nksnotebooks);

  const handleUpload = async (e) => {
    setIsUploadinng(true);
    const file = e.target.files[0];
    if (!file) {
      setIsUploadinng(false);
      setErrors({ ...errors, file: true });
      setErrorMessages({
        ...errorMessages,
        file: "No file was selected",
      });
    } else {
      handleCloseConfirm();
      const zip = new JSZip();
      zip.file(file.name, file);
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const newFile = new File([zipBlob], `${file.name}.zip`, {
        type: "application/zip",
      });
      const pdata = {
        notebook_name: modaldata.notebook_name,
        file: newFile,
        token: uploadPayload.token,
        status: modaldata.status,
      };
      uploadnksnbAction(pdata).then((res) => {
        if (res.type === "nksc2cupload/failure") {
          setUploadHasErrors(true);
          setUMessage(res.payload);
        } else {
          const pixelData = JSON.parse(res.payload?.pixel_data);
          setUploadHasErrors(false);
          setUploadSuccess(true);
          setModalData(res.payload);
          setNotebooks({
            ...notebooks,
            [res.payload.page_name]: { ...res.payload, pixel_data: pixelData },
          });
          setUMessage(
            "Thank you for your contribution. Please wait for the review process to be done.",
          );
        }
        setIsUploadinng(false);
      });
    }
  };

  const handleOpenBook = () => {
    const page = modaldata.notebook_name?.match(/\d+/g).map(Number);
    const nks_link = `https://www.wolframscience.com/nks/p${page[0]}`;
    window.open(nks_link, "_blank");
  };

  const handleClickChapter = (e) => {
    const id = e.currentTarget.getAttribute("id");
    setPayload({ ...payload, notebook_chapter: id });
    setActiveChapter(id);
  };

  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    const data = nksChapters.filter((item) => item.value == activeChapter);
    if (data.length) {
      const nbdata = data[0].data;
      setActiveData(nbdata);
      localStorage.setItem("chapter", data[0].value);
      localStorage.setItem("chapter_id", String(data[0].id));
      localStorage.setItem("chapter_label", data[0].label);
      setChapter({
        id: data[0].id,
        label: data[0].label,
      });
      let parsedList = [];
      Object.keys(nbdata).map((section) => {
        const _nbdata = nbdata[section].c2cdata?.map((d) => {
          return splitString(d);
        });
        parsedList = [...parsedList, ..._nbdata];
      });
      if (!imageCache[activeChapter]) {
        nksNotebooksAction(parsedList).then((res) => {
          if (res.type === "nksnotebooks/success" && res.payload.data.length) {
            const nbmap = {};
            res.payload.data.forEach((nb) => {
              const pixelData = JSON.parse(nb.pixel_data);
              nbmap[nb.page_name] = { ...nb, pixel_data: pixelData };
            });
            setImageCache({ ...imageCache, [activeChapter]: nbmap });
            setNotebooks({ ...notebooks, ...nbmap });
          }
        });
      }
    }
  }, [activeChapter]);

  const splitString = (string) => {
    if (string === "page0026a-fractal") {
      return string.split("-")[0];
    } else {
      return string.split("_")[0];
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = (e) => {
    setOpenModal(true);
    const id = e.currentTarget.getAttribute("id");
    const ndata = {
      notebook_name: id,
      notebook_link: `https://tccup.s3.us-east-1.amazonaws.com/${id}.nb`,
      notebook_chapter: activeChapter,
    };
    const pageName = splitString(id);
    if (notebooks[pageName]?.notebook_name) {
      setModalData(notebooks[pageName]);
      setSelectedId(notebooks[pageName].id);
    } else {
      setPayload({ ...payload, ...ndata });
      setModalData({ ...notebooks[pageName], ...ndata });
      setSelectedId(null);
    }
    setSelectedPageName(pageName);
  };

  const handleCheckboxChange = (e) => {
    setIsLinked(e.target.checked);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: false });
    setPayload({ ...payload, [name]: value });
  };

  const handleUploadChange = (e) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, "");
    const { name, value } = e.target;
    if (value.length > 6 || value.length < 6) {
      setErrors({ ...errors, [name]: true });
      setErrorMessages({
        ...errorMessages,
        [name]: `Length of token ${value.length < 6 ? "below" : "exceeds"} maximum of 6 digits`,
      });
    } else {
      setErrors({ ...errors, [name]: false });
    }
    setUploadPayload({ ...uploadPayload, [name]: value });
  };

  const resetData = () => {
    setPayload(initState.nkscontributor);
    setErrors(initState.errors);
    setIsLinked(false);
    setToken("");
    setUploadHasErrors(false);
    setUploadSuccess(false);
    setUMessage("");
  };

  const resetUploadData = () => {
    setUploadPayload(initState.uploadPayload);
    setErrors(initState.errors);
  };

  const handleSubmitNksContrib = () => {
    const fieldsValidated = validateInput(payload, errors, errorMessages);
    const inValids = Object.keys(fieldsValidated[0]).filter(
      (name) => fieldsValidated[0][name] && Object.keys(payload).includes(name),
    );
    if (inValids.length) {
      setErrors({ ...errors, ...fieldsValidated[0] });
      setErrorMessages({ ...errorMessages, ...fieldsValidated[1] });
      return;
    }
    const newpayload = { ...payload, page_name: selectedPageName };
    nkscontributorAction(newpayload).then((res) => {
      if (res.type === "nkscontributor/success") {
        const pixelData = JSON.parse(res.payload?.pixel_data);
        setSelectedId(res.payload?.id);
        setModalData(res.payload);
        setToken(res.payload?.token);
        setNotebooks({
          ...notebooks,
          [res.payload.page_name]: { ...res.payload, pixel_data: pixelData },
        });
      } else {
        const parsedErrorMessages = parseErrorMessages(res?.payload);
        const parsedErrors = parseErrors(res?.payload);
        setErrorMessages({ ...parsedErrorMessages });
        setErrors({ ...parsedErrors });
      }
    });
  };

  const handleConfirmUpload = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    resetUploadData();
  };

  const handleOpenWI = () => {
    window.open("https://wolframinstitute.org/", "_blank");
  };

  return (
    <React.Fragment>
      <Layout {...props}>
        <Box sx={{ display: "flex", height: "100vh" }}>
          <Box
            sx={{
              width: isMobile ? 100 : 350,
              backgroundColor: "#feb55a",
              p: 2,
              mt: isMobile ? 18 : 4,
            }}
          >
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Box
                component="img"
                src={nksbookimage}
                sx={{
                  width: 100,
                  height: 130,
                  cursor: "pointer",
                }}
              />
            </Box>
            <Stack sx={{ mt: 2 }} spacing={1}>
              {nksChapters.map((nksc) => (
                <Box
                  key={nksc.id}
                  id={`${nksc.value}`}
                  onClick={handleClickChapter}
                  sx={{
                    backgroundColor:
                      activeChapter === nksc.value ? "#b00f00" : "#ffffff",
                    p: 1.5,
                    cursor: "pointer",
                    color: activeChapter === nksc.value ? "white" : "#b00f00",
                    border: "1px solid #b00f00",
                    "&:hover": {
                      backgroundColor: "#b00f00",
                      color: "white",
                    },
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography
                      sx={{
                        fontSize: isMobile ? 27 : 14,
                      }}
                    >
                      {nksc.id}
                    </Typography>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    {!isMobile && (
                      <Typography
                        sx={{
                          fontSize: isMobile ? 24 : 14,
                        }}
                      >
                        {nksc.label}
                      </Typography>
                    )}
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Box>
          <Box
            ref={mainContentRef}
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              p: 2,
              backgroundColor: "grey.100",
              mt: 4,
            }}
          >
            <Container sx={{ mt: isMobile ? 15 : 2, mb: 5 }}>
              <Grid container>
                <Grid item xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      sx={{
                        fontSize: isMobile ? 35 : 25,
                      }}
                    >
                      {chapter.id === 0
                        ? `${chapter.label}`
                        : `Chapter ${chapter.id}: ${chapter.label}`}
                    </Typography>
                  </Box>
                </Grid>
                {chapter.id === 0 ? (
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <Divider />
                      <Typography sx={{ mt: 2 }}>
                        Click to Copy is a project initiative by the{" "}
                        <span
                          style={{ color: "#b00f00", cursor: "pointer" }}
                          onClick={handleOpenWI}
                        >
                          Wolfram Institute
                        </span>{" "}
                        to modernize the code used to create the figures from
                        Stephen Wolfram’s A New Kind of Science (NKS) book. This
                        site was inspired by the initiative with the goal of
                        empowering students and professionals, using the Wolfram
                        Language, to contribute code that reproduces the figures
                        in the NKS book.
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          fontSize: isMobile ? 24 : 20,
                        }}
                      >
                        Project Overview
                      </Typography>
                      <Divider />
                      <Typography
                        sx={{
                          fontStyle: "italic",
                          fontSize: isMobile ? 22 : 18,
                        }}
                      >
                        The project provides:
                      </Typography>
                      <ul>
                        <li>A way to download a Mathematica notebook</li>
                        <li>A way to upload a notebook if work is done</li>
                        <li>A link to NKS page the figure lives</li>
                      </ul>
                      <Typography
                        sx={{
                          fontStyle: "italic",
                          fontSize: isMobile ? 22 : 18,
                        }}
                      >
                        Each card on every page has:
                      </Typography>
                      <ul>
                        <li>An image of the figure to reproduce</li>
                        <li>The name of the figure from NKS book</li>
                        <li>The status of the card/notebook</li>
                      </ul>
                      <Typography
                        sx={{
                          fontStyle: "italic",
                          fontSize: isMobile ? 22 : 18,
                        }}
                      >
                        Statuses meaning:
                      </Typography>
                      <Stack>
                        <Stack spacing={1} direction="row" alignItems="center">
                          <CancelIcon
                            color="primary"
                            fontSize="small"
                            sx={{
                              color: colorMap.untouched,
                              fontSize: isMobile ? 40 : 18,
                            }}
                          />
                          <Typography sx={{ fontSize: isMobile ? 20 : 16 }}>
                            Untouched - There is no contribution made on the
                            notebook. Free to accept contributions.
                          </Typography>
                        </Stack>
                        <Stack spacing={1} direction="row" alignItems="center">
                          <CheckCircleIcon
                            color="primary"
                            fontSize="small"
                            sx={{
                              color: colorMap.pending,
                              fontSize: isMobile ? 40 : 18,
                            }}
                          />
                          <Typography sx={{ fontSize: isMobile ? 20 : 16 }}>
                            Pending - A contributor has started working on the
                            notebook but not yet done.
                          </Typography>
                        </Stack>
                        <Stack spacing={1} direction="row" alignItems="center">
                          <CheckCircleIcon
                            color="primary"
                            fontSize="small"
                            sx={{
                              color: colorMap.good,
                              fontSize: isMobile ? 40 : 18,
                            }}
                          />
                          <Typography sx={{ fontSize: isMobile ? 20 : 16 }}>
                            Good - A contributor finished working on the
                            notebook and submitted for review.
                          </Typography>
                        </Stack>
                        <Stack spacing={1} direction="row" alignItems="center">
                          <CancelIcon
                            color="primary"
                            fontSize="small"
                            sx={{
                              color: colorMap.unapproved,
                              fontSize: isMobile ? 40 : 18,
                            }}
                          />
                          <Typography sx={{ fontSize: isMobile ? 20 : 16 }}>
                            Unapproved - The code has been reviewed but changes
                            were not accepted.
                          </Typography>
                        </Stack>
                        <Stack spacing={1} direction="row" alignItems="center">
                          <CheckCircleIcon
                            color="primary"
                            fontSize="small"
                            sx={{
                              color: colorMap.approved,
                              fontSize: isMobile ? 40 : 18,
                            }}
                          />
                          <Typography sx={{ fontSize: isMobile ? 20 : 16 }}>
                            Approved - Review is done and changes have been
                            accepted to be deployed in the NKS book.
                          </Typography>
                        </Stack>
                      </Stack>
                      <Typography>
                        Note: Once a notebook is in any status other than
                        untouched, no other contributor can work on it but can
                        download and see what has been done.
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          fontSize: isMobile ? 24 : 20,
                        }}
                      >
                        How to contribute?
                      </Typography>
                      <Divider />
                      <Typography>
                        Click on any card with untouched status. A popup will
                        open that allows you to explore the details of the
                        notebook. Once you have explored and ready to
                        contribute, fill in your contributor details (just the
                        name and optionally, your social link), then click
                        "Start work on the notebook": this will change the
                        notebook status to pending and assign you as the
                        notebook contributor. After saving your details, a 6
                        digit number (token) will be provided to you. This token
                        will be required to upload the notebook. Please ensure
                        to save it before exiting the popup.
                      </Typography>
                      <Typography>
                        After you have worked on the notebook and feel confident
                        about your work, you can upload the same notebook. Be
                        sure not to change the name of the notebook because that
                        will mess up the cloud's link to the notebook.
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: isMobile ? 24 : 20,
                        }}
                      >
                        Review process
                      </Typography>
                      <Divider />
                      <Typography>
                        No information related to the review process yet.
                      </Typography>
                    </Stack>
                  </Grid>
                ) : (
                  Object.keys(activeData).map((d, index) => (
                    <Grid item xs={12} key={index}>
                      <Divider />
                      <Box sx={{ mt: 2 }}>
                        <Typography
                          sx={{
                            fontSize: isMobile ? 20 : 18,
                          }}
                        >
                          {`Section ${activeData[d].id}: ${activeData[d].name}`}
                        </Typography>
                        <Grid container sx={{ mt: 0.5, mb: 2 }} spacing={2}>
                          {activeData[d].c2cdata.map((c2c, index) => (
                            <Grid item xs={3} sm={12} md={6} lg={3} key={index}>
                              <Box
                                onClick={handleOpenModal}
                                id={c2c}
                                sx={{
                                  backgroundColor: "white",
                                  p: 1,
                                  cursor: "pointer",
                                  border: "1px solid lightgray",
                                  "&:hover": {
                                    border: `1px solid ${notebooks[splitString(c2c)]?.status ? colorMap[notebooks[splitString(c2c)]?.status] : colorMap.untouched}`,
                                  },
                                  position: "relative",
                                }}
                              >
                                {!nksnotebooks.loading && (
                                  <PageStatus
                                    status={
                                      notebooks[splitString(c2c)]?.status
                                        ? notebooks[splitString(c2c)]?.status
                                        : "untouched"
                                    }
                                  />
                                )}
                                {nksnotebooks.loading ? (
                                  <Box sx={{ padding: 2 }}>
                                    <Loader size={50} numberOfBars={4} />
                                  </Box>
                                ) : (
                                  <ImageCanvas
                                    rgbData={
                                      notebooks[splitString(c2c)]?.pixel_data
                                    }
                                    imageKey={c2c}
                                  />
                                )}
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{
                                    fontStyle: "italic",
                                  }}
                                >
                                  {c2c}
                                </Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Grid>
                  ))
                )}
              </Grid>
            </Container>
          </Box>
        </Box>
        <NKSC2CModal
          open={openModal}
          handleClose={handleCloseModal}
          handleChange={handleChange}
          errors={errors}
          errorMessages={errorMessages}
          isLinked={isLinked}
          handleCheckboxChange={handleCheckboxChange}
          modaldata={modaldata}
          resetData={resetData}
          selectedId={selectedId}
          handleOpenBook={handleOpenBook}
          handleSubmitNksContrib={handleSubmitNksContrib}
          token={token}
          handleUploadChange={handleUploadChange}
          handleUpload={handleUpload}
          disabledUpload={!uploadPayload.token || errors.token}
          isUploading={isUploading}
          openConfirm={openConfirm}
          handleCloseConfirm={handleCloseConfirm}
          handleConfirmUpload={handleConfirmUpload}
          uploadHasErrors={uploadHasErrors}
          uMessage={uMessage}
          uploadSuccess={uploadSuccess}
        />
      </Layout>
    </React.Fragment>
  );
};

export default PublicPage;
