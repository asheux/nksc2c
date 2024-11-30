// External imports
import React, { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import {
  Grid,
  Container,
  Typography,
  Box,
  Stack,
  CircularProgress,
  Paper,
  Checkbox,
  Modal,
  Divider,
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTheme } from "@mui/material/styles";
import { debounce } from "lodash";

// App related imports
import Layout from "src/components/Layout";
import { StyledButton } from "src/commons/Buttons";
import { StyledInput, ShowError } from "src/commons/Inputs";
import { Loader  } from "src/commons/Loader";
import { ImageCanvas, PageStatus } from "src/commons/Canvas";
import { NKSC2CModal } from "src/commons/Modals";
import { customStyles } from "src/styles";
import { useAppSelector } from "src/hooks";
import { isMobile, searchOptions, nksChapters, colorMap } from "src/helpers";
import { validateInput } from "src/commons/Inputs/validation";
import { parseErrorMessages, parseErrors } from "src/utils/parsePayload";
import initState from "src/redux/reducers/initState";

const nksbookimage = "/images/nks-book.png";
const images_json = "/json/images.json"

const PublicPage = (props) => {
  const { nkscontributorAction, nksNotebooksAction } = props;
  const [activeChapter, setActiveChapter] = useState(localStorage.chapter || "chapter00");
  const [chapter, setChapter] = useState({
    id: localStorage.chapter_id,
    label: localStorage.chapter_label
  });
  const [activeData, setActiveData] = useState({})
  const [dataImage, setImageData] = useState({})
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [isLinked, setIsLinked] = useState(false);
  const [errors, setErrors] = useState(initState.errors);
  const [errorMessages, setErrorMessages] = useState(initState.errorMessages);
  const [payload, setPayload] = useState(initState.nkscontributor);
  const [modaldata, setModalData] = useState(initState.nkscontributor);
  const [selectedId, setSelectedId] = useState(null);
  const [notebooks, setNotebooks] = useState({});
  const [token, setToken] = useState("")
  const [uploadPayload, setUploadPayload] = useState(initState.uploadPayload)

  const theme = useTheme();
  const canvasRef = useRef(null);

  // const handleUpload = (e) => {
  //   setIsUploadinng(true);
  //   const files = e.target.files;
  //   const file = files[0];
  //   if (!file) {
  //     setIsUploadinng(false);
  //   } else {
  //     setShowMessage(false);
  //     setVerificationError(false);
  //     setVerificationErrorM("");
  //     setUploadedImage(file);
  //     setProgress(10);
  //     // Compress the image to small
  //     import("compressorjs").then((module) => {
  //       const Compressor = module.default;
  //       new Compressor(file, {
  //         quality: 0.2,
  //         convertSize: 0,
  //         mimeType: "image/jpeg",
  //         success(result) {
  //           const blobObj = new Blob([result], { type: result.type });
  //           setBlob(blobObj);
  //         },
  //         error(err) {
  //           console.log(err.message);
  //         },
  //       });
  //     });
  //   }
  // };
  
  const handleOpenBook = () => {
    const page = modaldata.notebook_name?.match(/\d+/g).map(Number)
    const nks_link = `https://www.wolframscience.com/nks/p${page[0]}`
    window.open(nks_link, "_blank")
  }
  
  const handleClickChapter = (e) => {
    const id = e.currentTarget.getAttribute("id");
    setPayload({...payload, notebook_chapter: id})
    setActiveChapter(id)
  }
  
  useEffect(() => {
    nksNotebooksAction().then(res => {
      if (res.type === "nksnotebooks/success" && res.payload.data.length) {
        let nbmap = {};
        res.payload.data.forEach(nb => {
          nbmap[nb.notebook_name] = nb
        });
        setNotebooks(nbmap);
      }
    });
    if (!Object.keys(dataImage).length) {
      setLoading(true)
      fetch(images_json)
        .then(response => response.json())
        .then(rgbData => {
          setLoading(false)
          setImageData(rgbData)
        });
    }
  }, [])
  
  useEffect(() => {
    const data = nksChapters.filter(item => item.value == activeChapter);
    if (data.length) {
      setActiveData(data[0].data)
      localStorage.setItem("chapter", data[0].value)
      localStorage.setItem("chapter_id", String(data[0].id))
      localStorage.setItem("chapter_label", data[0].label)
      setChapter({
        id: data[0].id,
        label: data[0].label
      })
    }
  }, [activeChapter])
  
  const splitString = (string) => {
    return string.split('_')[0]
  }
  
  const handleCloseModal = () => {
    setOpenModal(false);
  }
  
  const handleOpenModal = (e) => {
    setOpenModal(true);
    const id = e.currentTarget.getAttribute("id");
    const ndata = {
      ...initState.nkscontributor,
      notebook_name: id,
      notebook_link: `https://tccup.s3.amazonaws.com/${id}.nb`,
      status: "pending",
      notebook_chapter: activeChapter
    }
    if (notebooks[id] && Object.keys(notebooks[id]).length) {
      setModalData(notebooks[id])
      setSelectedId(notebooks[id].id)
    } else {
      setPayload({...payload, ...ndata })
      setModalData({...modaldata, ...ndata })
      setSelectedId(null)
    }
  }
  
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
    if (value.length > 9) {
      setErrors({ ...errors, [name]: true })
      setErrorMessages({...errorMessages, [name]: "Length of token exceeds maximum of 9 digits"})
    } else {
      setErrors({ ...errors, [name]: false });
    }
    setUploadPayload({...uploadPayload, [name]: value })
  }
  
  const resetData = () => {
    setPayload(initState.nkscontributor)
    setErrors(initState.errors)
    setIsLinked(false)
    setToken("")
  }
  
  const handleSubmitNksContrib = () => {
    const fieldsValidated = validateInput(payload, errors, errorMessages);
    const inValids = Object.keys(fieldsValidated[0]).filter(
      name => fieldsValidated[0][name] && Object.keys(payload).includes(name),
    );
    if (inValids.length) {
      setErrors({ ...errors, ...fieldsValidated[0] });
      setErrorMessages({ ...errorMessages, ...fieldsValidated[1] });
      return;
    }
    nkscontributorAction(payload).then(res => {
      if (res.type === "nkscontributor/success") {
        setSelectedId(res.payload?.id)
        setModalData(res.payload)
        setToken(res.payload?.token)
        setNotebooks({...notebooks, [res.payload.notebook_name]: res.payload})
      } else {
        const parsedErrorMessages = parseErrorMessages(res?.payload);
        const parsedErrors = parseErrors(res?.payload);
        setErrorMessages({ ...parsedErrorMessages });
        setErrors({ ...parsedErrors });
      }
    })
  }

  return (
    <React.Fragment>
      <Layout {...props}>
        <Box sx={{ display: 'flex', height: '100vh' }}>
          <Box
            sx={{
              width: '350px',
              backgroundColor: '#feb55a',
              p: 2,
              mt: 4
            }}
          >
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Box
                component="img"
                src={nksbookimage}
                sx={{
                  width: 100,
                  height: 130,
                  cursor: "pointer"
                }}
              />
            </Box>
            <Stack sx={{mt: 2 }} spacing={1}>
              {nksChapters.map(nksc => (
                <Box
                  key={nksc.id}
                  id={`${nksc.value}`}
                  onClick={handleClickChapter}
                  sx={{
                    backgroundColor: activeChapter === nksc.value ? "#b00f00" : "#ffffff",
                    p: 1.5,
                    cursor: "pointer",
                    color: activeChapter === nksc.value ? "white" : "#b00f00",
                    border: "1px solid #b00f00",
                    "&:hover": {
                      backgroundColor: "#b00f00",
                      color: "white"
                    },
                  }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography
                        sx={{
                          fontSize: 14
                        }}>
                        {nksc.id}
                      </Typography>
                      <Divider
                        className="divider"
                        orientation="vertical"
                        variant="middle"
                        flexItem
                      />
                      <Typography
                        sx={{
                          fontSize: 14,
                        }}>
                        {nksc.label}
                      </Typography>
                    </Stack>
                  </Box>
              ))}
            </Stack>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              p: 2,
              backgroundColor: 'grey.100',
              mt: 4,
            }}
          >
            <Container sx={{ mt: 2, mb: 5 }}>
              <Grid container>
                <Grid item xs={12}>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="h5">
                      {chapter.id === 0 ? `${chapter.label}` : `Chapter ${chapter.id}: ${chapter.label}`}
                    </Typography>
                  </Box>
                </Grid>
                {chapter.id === 0 ? (
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <Divider />
                      <Typography sx={{ mt: 2 }}>
                        Click to Copy is a project initiative by the Wolfram Institute to
                        modernize the code used to create the figures from Stephen Wolfram’s
                        A New Kind of Science (NKS) book. This site was inspired by the initiative
                        with the goal of empowering students and professionals, using the Wolfram
                        Language, to contribute code that reproduces the figures in the NKS book.
                      </Typography>
                      <Typography
                        variant="h5">
                        Project Overview
                      </Typography>
                      <Divider />
                      <Typography>
                        The project provides:
                      </Typography>
                      <ul>
                        <li>A way to download empty Mathematica notebook</li>
                        <li>A way to upload a notebook if work is done</li>
                        <li>A link to NKS page the figure lives</li>
                      </ul>
                      <Typography>
                        Each card on every page has:
                      </Typography>
                      <ul>
                        <li>An image of the figure to reproduce</li>
                        <li>The name of the figure from NKS book</li>
                        <li>The status of the card/notebook</li>
                      </ul>
                      <Typography>
                        Statuses meaning:
                      </Typography>
                      <Stack>
                        <Stack spacing={1} direction="row" alignItems="center">
                          <CancelIcon 
                            color="primary"
                            fontSize="small"
                            sx={{
                              color: colorMap.untouched,
                            }}
                          />
                          <Typography>
                            Untouched - There is no contribution made on the notebook. Free to accept contribution.
                          </Typography>
                        </Stack>
                        <Stack spacing={1} direction="row" alignItems="center">
                          <CheckCircleIcon 
                            color="primary"
                            fontSize="small"
                            sx={{
                              color: colorMap.pending,
                            }}
                          />
                          <Typography>
                            Pending - A contributor has started working on the notebook but not yet done.
                          </Typography>
                        </Stack>
                        <Stack spacing={1} direction="row" alignItems="center">
                          <CheckCircleIcon 
                            color="primary"
                            fontSize="small"
                            sx={{
                              color: colorMap.good,
                            }}
                          />
                          <Typography>
                            Good - A contributor finished working on the notebook and submitted for review.
                          </Typography>
                        </Stack>
                        <Stack spacing={1} direction="row" alignItems="center">
                          <CancelIcon 
                            color="primary"
                            fontSize="small"
                            sx={{
                              color: colorMap.unapproved,
                            }}
                          />
                          <Typography>
                            Unapproved - The code has been reviewed but changes were not accepted.
                          </Typography>
                        </Stack>
                        <Stack spacing={1} direction="row" alignItems="center">
                          <CheckCircleIcon 
                            color="primary"
                            fontSize="small"
                            sx={{
                              color: colorMap.approved,
                            }}
                          />
                          <Typography>
                            Approved - Review is done and changes have been accepted to be deployed in the NKS book.
                          </Typography>
                        </Stack>
                      </Stack>
                      <Typography>
                        Note: Once a notebook is in any status other than untouched, no other contributor can work on it but can download and see what has been done.
                      </Typography>
                      <Typography
                        variant="h5">
                        How to contribute?
                      </Typography>
                      <Divider />
                      <Typography>
                        Click on any card with untouched status. A popup will open that allows you to explore the details of the notebook. Once you have explored and ready to contribute,
                        fill in your contributor details (just the name and optionally, your social link), then click "Start work on the notebook": this will change the notebook status to pending
                        and assign you as the notebook contributor. After saving your details, a 9 digit number (token) will be provided to you. This token will be required to upload the notebook.
                        Please ensure to save it before exiting the popup.
                      </Typography>
                      <Typography>
                        After you have worked on the notebook and feel confident about your work, you can upload the same notebook. Be sure not to change the name of the notebook because that
                        will mess up the cloud's link to the notebook.
                      </Typography>
                      <Typography
                        variant="h5">
                        Review process
                      </Typography>
                      <Divider />
                    </Stack>
                  </Grid>
                ) : (
                  Object.keys(activeData).map((d, index) => (
                    <Grid item xs={12} key={index}>
                      <Divider />
                      <Box sx={{mt: 2}}>
                        <Typography
                          sx={{
                            fontSize: 20,
                          }}>
                          {`Section ${activeData[d].id}: ${activeData[d].name}`}
                        </Typography>
                        <Grid container sx={{ mt: .5, mb: 2 }} spacing={2}>
                          {activeData[d].c2cdata.map((c2c, index) => (
                            <Grid item xs={3} sm={6} md={3} key={index}>
                              <Box
                                onClick={handleOpenModal}
                                id={c2c}
                                sx={{
                                  backgroundColor: "white",
                                  p: 1,
                                  cursor: "pointer",
                                  border: "1px solid lightgray",
                                  "&:hover": {
                                    border: `1px solid ${notebooks[c2c]?.status ? colorMap[notebooks[c2c]?.status] : colorMap.untouched}`,
                                  },
                                  position: 'relative'
                                }}>
                                <PageStatus status={notebooks[c2c]?.status ? notebooks[c2c]?.status : "untouched"} />
                                {loading ? (
                                  <Box sx={{ padding: 2 }}>
                                    <Loader
                                      size={50}
                                      numberOfBars={4}
                                    />
                                  </Box>
                                ) : Object.keys(dataImage).length ? (
                                  <ImageCanvas rgbData={dataImage[splitString(c2c)]} imageKey={c2c}/>
                                ) : (
                                  <Typography variant="body2" color="text.secondary">
                                    No image
                                  </Typography>
                                )}
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ fontStyle: "italic"}}>
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
          loading={false}
          handleChange={handleChange}
          errors={errors}
          errorMessages={errorMessages}
          isLinked={isLinked}
          handleCheckboxChange={handleCheckboxChange}
          payload={payload}
          modaldata={modaldata}
          setModalData={setModalData}
          resetData={resetData}
          selectedId={selectedId}
          handleOpenBook={handleOpenBook}
          handleSubmitNksContrib={handleSubmitNksContrib}
          token={token}
          handleUploadChange={handleUploadChange}
        />
      </Layout>
    </React.Fragment>
  );
};

export default PublicPage;
