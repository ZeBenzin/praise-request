const moment = require("moment");
const GithubAccount = require("../github-account/model");
const githubAccountController = require("../github-account/controller");
const utils = require("../../../utils/auth");
const axios = require("axios");

const githubBasePath = "https://api.github.com";

const createTransaction = (req, res, next) => {
  const toAccount = GithubAccount.findOne({ userId: req.body.to.userId }).then(
    account => {
      if (!account) {
        const url = `${githubBasePath}/user/${req.body.to.userId}`;
        return axios.get(url).then(data => {
          if (data.data) {
            return githubAccountController
              .create(req.body.to, next)
              .then(model => {
                return model;
              });
          }
        });
      }
      return account;
    }
  );

  const fromAccount = GithubAccount.findOne({ userId: req.body.from.userId });

  Promise.all([toAccount, fromAccount])
    .then(accounts => {
      const toUUID = accounts[0]._doc.ostId;
      const fromUUID = accounts[1]._doc.ostId;
      const timestamp = moment().unix();
      const queryString = utils.generateQueryString(
        timestamp,
        "/transaction-types/execute",
        { from_uuid: fromUUID, to_uuid: toUUID, transaction_kind: "Praise" }
      );
      const signature = utils.generateSignature(queryString);
      const url = `https://playgroundapi.ost.com${queryString}&signature=${signature}`;
      const body = {
        api_key: process.env.API_KEY,
        to_uuid: toUUID,
        from_uuid: fromUUID,
        transaction_kind: "Praise",
        request_timestamp: timestamp,
        signature
      };
      return axios.post(url, body);
    })
    .then(({ data }) => {
      console.log("TX Data", data);
      // emit socket event here;
      return res.status(200).json(data);
    })
    .catch(err => res.json({ code: 400, message: err.message }));
};

module.exports = { createTransaction };
