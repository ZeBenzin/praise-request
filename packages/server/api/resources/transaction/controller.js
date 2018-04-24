const GithubAccount = require("../github-account/model");
const request = require("request");

const githubBasePath = "https://api.github.com";
const customRequest = request.defaults({
  headers: {
    "User-Agent": "praise request"
  }
});

const createTransaction = (req, res) => {
  /**
   * payload = {
   *  to: {}
   *  from: {}
   *  amount: Number
   * }
   */

  GithubAccount.findById(req.body.to)
    .then(account => {
      if (!account) {
        // Check it exists on Github before creating it
        const url = githubBasePath + "/repositories/" + req.body.to.id;
        customRequest.get(url, (err, response) => {
          // If account exists on Github
          if (response.body) {
            return GithubAccount.create(req.body.to);
          }
        });
      }
      return account;
    })
    .then(toAccount => {
      return { toAccount, fromAccount: GithubAccount.findById(req.body.from) };
    })
    .then(accounts => {
      const toKeyPair = accounts.toAccount.keyPair;
      const fromKeyPair = accounts.fromAccount.keyPair;
      const transactionAmount = req.body.amount;

      if (accounts.balance < amount) {
        // Insufficient balance
      }
      // Send these to OST
    })
    .catch(err => res.json({ code: 400, message: err.message }));
};

module.exports = { createTransaction };
