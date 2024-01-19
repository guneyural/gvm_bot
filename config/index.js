const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../.env") });

const envVarsSchema = Joi.object()
  .keys({
    API_KEY: Joi.string().required().description("Api key from mexc"),
    API_SECRET: Joi.string().required().description("Api secret from mexc"),
    BASE_URL: Joi.string().required().description("Base url of mexc"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({
    errors: { label: "key" },
  })
  .validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

module.exports = {
  apiKey: envVars.API_KEY,
  apiSecret: envVars.API_SECRET,
  baseUrl: envVars.BASE_URL,
};
