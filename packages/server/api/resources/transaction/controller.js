const GithubAccount = require("../github-account/model");
const axios = require("axios");

const githubBasePath = "https://api.github.com";

const createTransaction = (req, res) => {
  const toAccount = GithubAccount.findOne({ userId: req.body.to.userId }).then(
    account => {
      if (!account) {
        const url = `${githubBasePath}/user/${req.body.to.userId}`;
        return axios.get(url).then(data => {
          if (data.data) {
            return GithubAccount.create(req.body.to);
          }
        });
      }
      return account;
    }
  );

  const fromAccount = GithubAccount.findOne({ userId: req.body.from.userId });

  Promise.all([toAccount, fromAccount])
    .then(accounts => {
      const toKeyPair = accounts.toAccount.keyPair;
      const fromKeyPair = accounts.fromAccount.keyPair;
      const transactionAmount = req.body.amount;

      // 1. Check balance is sufficient
      // 2. Make transaction

      // OST API
      // /transaction-types/execute?api_key=API_KEY&from_uuid=FROM_UUID&request_timestamp=EPOCH_TIME_SEC&to_uuid=TO_UUID&transaction_kind=NAME
    })
    .catch(err => res.json({ code: 400, message: err.message }));
};

module.exports = { createTransaction };
