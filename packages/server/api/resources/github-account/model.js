const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const githubAccountSchema = new Schema({
  userId: Number,
  userName: String,
  ostKeyPair: { publicKey: String, privateKey: String }
});

const GithubAccount = mongoose.model("github_account", githubAccountSchema);

module.exports = GithubAccount;
