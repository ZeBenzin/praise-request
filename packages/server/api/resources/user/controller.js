const User = require("./model");

const getUserById = () => {};

const createUser = userDefn => {
  User.create(userDefn);
};

module.exports = { getUserById, createUser };
