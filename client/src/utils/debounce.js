const debounce = (func, delay) => {
  var timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => func(), delay);
  };
};

export default debounce;
