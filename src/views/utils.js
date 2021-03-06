const floatRegEx = /[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)/;
const IntRegEx = /(?<=\s|^)\d+(?=\s|$)/;
export const validateData = (data) => {
  if (!data.iters || !IntRegEx.test(data.iters)) return true;
  if (
    !data.alpha ||
    !floatRegEx.test(data.alpha) ||
    data.alpha < 0 ||
    data.alpha > 1
  )
    return true;
  return false;
};

export const validateOnChange = (data) => {
  const error = {};
  if (!data.iters) {
    error.iters = "field is required";
  } else if (!IntRegEx.test(data.iters)) {
    error.iters = " iters filed accept numbers only";
  }
  if (!data.alpha) {
    error.alpha = "field is required";
  } else if (!floatRegEx.test(data.alpha)) {
    error.alpha = "alpha field accept numbers only";
  } else if (data.alpha < 0 || data.alpha > 1) {
    error.alpha = "alpha must be between 0 and 1";
  }
  return error;
};
