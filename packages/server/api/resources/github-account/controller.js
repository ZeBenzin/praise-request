const axios = require("axios");
const moment = require("moment");
const GithubAccount = require("./model");
const utils = require("../../../utils/auth");

const getAccountById = () => {};

const createAccount = (req, res) => {
  let persistedAccount;
  return GithubAccount.create(req.body)
    .then(({ _doc: account }) => {
      const timestamp = moment().unix();
      const queryString = utils.generateQueryString(
        timestamp,
        "/users/create",
        { name: account.userName }
      );
      const signature = utils.generateSignature(queryString);
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
