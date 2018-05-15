const axios = require("axios");
const moment = require("moment");
const GithubAccount = require("./model");
const utils = require("../../../utils/auth");

const getAccountById = () => {};

const sanitizeUserName = userName => {
  let strippedName = userName.replace(/[^\w\d\s]/g, "");
  if (strippedName.length < 3) {
    strippedName = `${strippedName}000`;
  }

  if (strippedName.length > 20) {
    strippedName = strippedName.substring(0, 20);
  }

  return strippedName;
};

const create = (body, next) => {
  const account = body;
  const ostLegalUserName = sanitizeUserName(account.userName);
  const timestamp = moment().unix();
  const queryString = utils.generateQueryString(timestamp, "/users/create", {
    name: ostLegalUserName
  });
  const signature = utils.generateSignature(queryString);
  const url = `https://playgroundapi.ost.com${queryString}&signature=${signature}`;
  const payload = {
    api_key: process.env.API_KEY,
    name: ostLegalUserName,
    request_timestamp: timestamp,
    signature
  };
  return axios.post(url, payload).then(({ data }) => {
    const ostUser = data.data.economy_users[0];
    const account = Object.assign({}, body, { ostId: ostUser.uuid });
    return GithubAccount.create(account);
  });
};

const createAccount = (req, res, next) => {
  GithubAccount.findOne({ userId: req.body.userId })
    .then(doc => {
      if (doc) {
        throw new Error(
          `GithubAccount with ID ${req.body.userId} already exists`
        );
      } else {
        return create(req.body, next);
      }
    })
    .then(({ _doc: account }) => {
      res.status(201).json(account);
    })
    .catch(err => {
      res.status(400).json({ code: 400, err: err.message });
    });
};

module.exports = { getAccountById, createAccount, create };
