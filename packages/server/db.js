const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const connect = config => {
  return mongoose.connect("mongodb://localhost/praise");
};

module.exports = connect;
