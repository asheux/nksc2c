const context = {
  data: {},
  errors: null,
  loading: false,
};

export default {
  payload: {
    nkscontributor: context,
    nksnotebooks: {
      ...context,
      data: [],
    },
  },
  nkscontributor: {
    name: "",
    social_link: "",
    status: "",
    notebook_name: "",
    notebook_link: "",
    notebook_chapter: "",
  },
  uploadPayload: {
    file: null,
    token: "",
  },
  errors: {
    name: false,
    social_link: false,
    status: false,
    notebook_name: false,
    notebook_link: false,
    notebook_chapter: false,
    token: false,
  },
  errorMessages: {
    name: "Invalid name",
    social_link: "",
    status: "",
    notebook_name: "",
    notebook_link: "",
    notebook_chapter: "",
    token: "",
  },
};
