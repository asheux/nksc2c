import { getHost } from "src/api";

export const uploadNKSNotebook = (data) => {
  const formData = new FormData();
  formData.set("file", data.file);
  formData.set("token", data.token);
  formData.set("notebook_name", data.notebook_name);
  return fetch(`${getHost()}/uploadnksnotebook`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  }).then((res) => res.json());
};
