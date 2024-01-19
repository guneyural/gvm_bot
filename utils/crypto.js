const crypto = require("crypto");
const {
  removeEmptyValue,
  buildQueryString,
} = require("../utils/buildQueryString");
const config = require("../config");

function generateSignature(payload) {
  const timestamp = Date.now();

  payload = removeEmptyValue(payload);

  const queryString = buildQueryString({ ...payload, timestamp });

  const signature = crypto
    .createHmac("sha256", config.apiSecret)
    .update(queryString)
    .digest("hex");

  return `${signature}&timestamp=${timestamp}`;
}

module.exports = generateSignature;
