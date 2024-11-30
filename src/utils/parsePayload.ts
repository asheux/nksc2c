export const parseErrors = errors => ({
  name: !!errors["name"],
  social_link: !!errors["social_link"],
  status: !!errors["status"],
  notebook_name: !!errors["notebook_name"],
  notebook_chapter: !!errors["notebook_chapter"],
  notebook_link: !!errors["notebook_link"],
  token: !!errors["token"],
  file: !!errors["file"],
});

export const parseErrorMessages = errors => ({
  name: errors["name"] || "",
  social_link: errors["social_link"] || "",
  status: errors["status"] || "",
  notebook_name: errors["notebook_name"] || "",
  notebook_chapter: errors["notebook_chapter"] || "",
  notebook_link: errors["notebook_link"] || "",
  token: errors["token"] || "",
  file: errors["file"] || "",
});