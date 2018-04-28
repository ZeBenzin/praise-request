const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const githubAccountSchema = new Schema({
  userId: { type: Number, unique: true },
  userName: { type: String, unique: true },
  ostId: { type: String }
});

const GithubAccount = mongoose.model("github_account", githubAccountSchema);

module.exports = GithubAccount;
