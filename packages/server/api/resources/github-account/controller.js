const axios = require("axios");
const crypto = require("crypto");
const moment = require("moment");
const queryString = require("query-string");
const GithubAccount = require("./model");

const getAccountById = () => {};

const generateQueryString = (name, timestamp) => {
  const inputParams = {
    api_key: "1f1b79301ce430bad039",
    request_timestamp: timestamp,
    name
  };

  const inputParamsString = queryString
    .stringify(inputParams, { arrayFormat: "bucket" })
    .replace(/%20/g, "+");

  return `/users/create?${inputParamsString}`;
};

// Will go in a utility file
const generateSignature = stringToSign => {
  const buffer = new Buffer.from(process.env.API_SECRET, "utf8");
  const hmac = crypto.createHmac("sha256", buffer);
  hmac.update(stringToSign);
  const digest = hmac.digest("hex");
  return digest;
};

const createAccount = (req, res) => {
  return GithubAccount.create(req.body)
    .then(({ _doc: account }) => {
      const timestamp = moment().unix();
      const queryString = generateQueryString(account.userName, timestamp);
      const signature = generateSignature(queryString);
      return axios.post(
        `https://playgroundapi.ost.com/users/create?api_key=1f1b79301ce430bad039&name=${
          account.userName
        }&request_timestamp=${timestamp}&signature=${signature}`
      );
    })
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(400).json({ code: 400, err: err.config });
    });
};

module.exports = { getAccountById, createAccount };
