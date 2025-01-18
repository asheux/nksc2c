const NKS_BASE_URL =
  `${process.env.NKS_BASE_URL}` || "https://api.nksclicktocopy.com";

export const getHost = () => NKS_BASE_URL;
