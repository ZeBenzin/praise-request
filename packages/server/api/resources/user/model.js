const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    github_accounts: [String]
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

userSchema.methods = {
  hashPassword(plainTextPassword) {
    const salt = bcrypt.getSaltSync(10);
    return bcrypt.hashSync(plainTextPassword, salt);
  }
};

userSchema.pre("save", next => {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = this.hashPassword(this.password);
  next();
});

module.exports = User;
