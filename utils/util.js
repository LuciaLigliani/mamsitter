exports.excludeFields = (body, ...toExclude) => {
  toExclude.forEach(el => delete body[el]);
  return body;
}
