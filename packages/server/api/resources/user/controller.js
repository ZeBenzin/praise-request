const User = require("./model");

const getUserAccounts = (req, res) => {
  // Not sure how to do this yet in Mongo
  // Get the array of accounts and then Promise.all ?
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json({ code: 400, error: err.message }));
};

const createUser = (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(err => {
      res.status(400).json({ code: 400, error: err.message });
    });
};

module.exports = { getUserById, createUser };
