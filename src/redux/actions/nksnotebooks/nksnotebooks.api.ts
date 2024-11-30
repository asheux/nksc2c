import { getHost } from "src/api";

export const getNKSNotebooks = () => {
  let url = `${getHost()}/nksc2c_notebooks`;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then(res => res.json());
};
