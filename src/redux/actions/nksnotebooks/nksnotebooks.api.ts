import { getHost } from "src/api";

export const getNKSNotebooks = (payload) => {
  const url = `${getHost()}/nksc2c_notebooks?pages=${payload}`;
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
};
