import { getHost } from "src/api";

export const addNKScontributor = data => {
  return fetch(`${getHost()}/nksc2c_notebook`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  }).then(res => res.json());
};
