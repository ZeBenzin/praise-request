const crypto = require("crypto");
const queryString = require("query-string");

const generateQueryString = (timestamp, endpoint, params) => {
  const inputParams = Object.assign(
    {},
    {
      api_key: process.env.API_KEY,
      request_timestamp: timestamp
    },
    params
  );

  const inputParamsString = queryString
    .stringify(inputParams, { arrayFormat: "bucket" })
    .replace(/%20/g, "+");

  return `${endpoint}?${inputParamsString}`;
};

const generateSignature = stringToSign => {
  const buff = new Buffer.from(process.env.API_SECRET, "utf8");
  const hmac = crypto.createHmac("sha256", buff);
  hmac.update(stringToSign);
  return hmac.digest("hex");
};

module.exports = { generateQueryString, generateSignature };
