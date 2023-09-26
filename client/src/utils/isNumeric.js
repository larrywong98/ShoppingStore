const isNumeric = (str) => {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
};

export default isNumeric;
