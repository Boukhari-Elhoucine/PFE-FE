const floatRegEx = /[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)/;
const IntRegEx = /(?<=\s|^)\d+(?=\s|$)/;
export const validateData = (data) => {
  if (!data.iters || !IntRegEx.test(data.iters)) return true;
  if (!data.alpha || !floatRegEx.test(data.alpha)) return true;
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
  }
  return error;
};
