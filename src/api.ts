const NKS_BASE_URL =
  `${process.env.NKS_BASE_URL}` || "http://127.0.0.1:5000";

export const getHost = () => NKS_BASE_URL;
