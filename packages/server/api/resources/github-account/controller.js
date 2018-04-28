const axios = require("axios");
const crypto = require("crypto");
const moment = require("moment");
const queryString = require("query-string");
const GithubAccount = require("./model");

const getAccountById = () => {};

const generateQueryString = (name, timestamp) => {
  const inputParams = {
    api_key: process.env.API_KEY,
    name,
    request_timestamp: timestamp
  };

  const inputParamsString = queryString
    .stringify(inputParams, { arrayFormat: "bucket" })
    .replace(/%20/g, "+");

  return `/users/create?${inputParamsString}`;
};

// Will go in a utility file
const generateSignature = stringToSign => {
  const buff = new Buffer.from(process.env.API_SECRET, "utf8");
  const hmac = crypto.createHmac("sha256", buff);
  hmac.update(stringToSign);
  return hmac.digest("hex");
};

const createAccount = (req, res) => {
  let persistedAccount;
  return GithubAccount.create(req.body)
    .then(({ _doc: account }) => {
      const timestamp = moment().unix();
      const queryString = generateQueryString(account.userName, timestamp);
      const signature = generateSignature(queryString);
      const url = `https://playgroundapi.ost.com${queryString}&signature=${signature}`;
      const body = {
        api_key: process.env.API_KEY,
        name: account.userName,
        request_timestamp: timestamp,
        signature
      };
      persistedAccount = account;
      return axios.post(url, body);
    })
    .then(({ data }) => {
      const ostUser = data.data.economy_users[0];
      return GithubAccount.findOneAndUpdate(
        { userId: persistedAccount.userId },
        { ostId: ostUser.uuid }
      );
    })
    .then(({ _doc: account }) => {
      res.status(201).json(account);
    })
    .catch(err => {
      res.status(400).json({ code: 400, err: err.message });
    });
};

module.exports = { getAccountById, createAccount };
