const CustomError = ({ code, message, status }) => {
  const error = new Error();
  error.code = code;
  error.message = message;
  error.status = status;

  return error;
};
