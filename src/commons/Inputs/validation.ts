import initState from "src/redux/reducers/initState";

export const validateName = (name, field) => {
  // check if name has special characters for security
  // to avoid SQL injection attack
  if (!name) {
    return { valid: false, message: "Required" };
  }
  const nameRegex = /^[a-z0-9A-Z\s-.]+$/;
  return {
    valid: nameRegex.test(name),
    message: initState.errorMessages[field],
  };
};

export const validateInput = (
  inpayload,
  errors,
  errorMessages,
) => {
  const { name } = inpayload;

  const fieldErrors = errors;
  const fieldErrorMessages = errorMessages;

  Object.keys(inpayload).forEach(field => {
    const vname = validateName(name, "name");
    if (field === "name" && !vname.valid) {
      fieldErrors[field] = true;
      fieldErrorMessages[field] = vname.message;
    }
  });
  return [fieldErrors, fieldErrorMessages];
};
