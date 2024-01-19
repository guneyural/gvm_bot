const config = require("./config");
const axios = require("axios");
const {
  removeEmptyValue,
  buildQueryString,
} = require("./utils/buildQueryString");
const generateSignature = require("./utils/crypto");

function makePublicRequest(method, path, payload = {}) {
  return new Promise(async (resolve, reject) => {
    // Validate request method
    const validMethods = ["get", "post", "put", "delete"];
    if (!validMethods.includes(method.toLowerCase())) {
      throw new Error("Invalid HTTP method");
    }

    // Create url params
    payload = removeEmptyValue(payload);
    payload = buildQueryString(payload);
    if (payload !== "") path = `${path}?${payload}`;

    let configAxios = {
      headers: {
        "Content-Type": "application/json",
        "X-MEXC-APIKEY": config.apiKey,
      },
      method: method.toLowerCase(),
      url: `${config.baseUrl}${path}`,
    };

    try {
      const data = await axios(configAxios);

      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}

function makeSignedRequest(method, path, payload = {}) {
  return new Promise(async (resolve, reject) => {
    // Validate request method
    const validMethods = ["get", "post", "put", "delete"];
    if (!validMethods.includes(method.toLowerCase())) {
      throw new Error("Invalid HTTP method");
    }

    // Generate signature
    const signature = generateSignature(payload);

    // Create url params
    payload = removeEmptyValue(payload);
    payload = buildQueryString(payload);
    if (payload !== "") path = `${path}?${payload}`;

    // If request payload is empty add ? otherwise add &
    const addQuestionMarkOrAmpersand = payload == "" ? "?" : "&";

    let configAxios = {
      headers: {
        "Content-Type": "application/json",
        "X-MEXC-APIKEY": config.apiKey,
      },
      method: method.toLowerCase(),
      url: `${config.baseUrl}${path}${addQuestionMarkOrAmpersand}signature=${signature}`,
    };

    try {
      const data = await axios(configAxios);

      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { makePublicRequest, makeSignedRequest };
