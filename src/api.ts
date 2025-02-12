const NKS_BASE_URL =
  `${process.env.NKS_BASE_URL}` || "https://api.nksclicktocopy.com";

export const getHost = () => NKS_BASE_URL;

export const AWS_S3 = "https://tccup.s3.us-east-1.amazonaws.com";
