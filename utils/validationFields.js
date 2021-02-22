exports.maxDate = () => {
  const anno = new Date().getFullYear() - 18;
  return new Date().setFullYear(anno);
};

exports.minDate = () => {
  const anno = new Date().getFullYear() - 100;
  return new Date().setFullYear(anno);
};

exports.validateRange = (el) => {
  if(el.length === 0) return true;
  if (el.length === 2 && el[0] <= 18 && el[1] <= 18 && el[0] <= el[1]) return true;
  return false;
};