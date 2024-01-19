const buildQueryString = (params) => {
  if (!params) return "";
  return Object.entries(params).map(stringifyKeyValuePair).join("&");
};

const stringifyKeyValuePair = ([key, value]) =>
  `${key}=${encodeURIComponent(value)}`;

const removeEmptyValue = (obj) => {
  if (!(obj instanceof Object)) return {};
  Object.keys(obj).forEach((key) => isEmptyValue(obj[key]) && delete obj[key]);
  return obj;
};

const isEmptyValue = (input) => {
  /**
   * input is considered empty value: falsy value (like null, undefined, '', except false and 0),
   * string with white space characters only, empty array, empty object
   */
  return (
    (!input && input !== false && input !== 0) ||
    ((input instanceof String || typeof input === "string") && !input.trim()) ||
    (Array.isArray(input) && !input.length) ||
    (input instanceof Object && !Object.keys(input).length)
  );
};

module.exports = { removeEmptyValue, buildQueryString };
