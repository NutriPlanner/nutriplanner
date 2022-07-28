const invalidCredentials = (data) => {
  return {
    message: "Las credenciales ingresadas no son válidas.",
  };
};

export default {
  AUTH__INVALID_CREDENTIALS: invalidCredentials,
};
