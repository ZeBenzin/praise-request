const GithubAccount = require("./model");

const getAccountById = () => {};

const createAccount = (req, res) => {
  return GithubAccount.create(req.body).then(account => {
    res.status(201).json(account);
  });
};

module.exports = { getAccountById, createAccount };
