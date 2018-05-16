const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    ghUserId: { type: Number, unique: true, required: true },
    ghUserName: { type: String, unique: true, required: true },
    ostUuid: { type: String }
  },
  { timestamps: true }
);

userSchema.methods = {
  authenticate: function(plainTextPassword) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  }
};

const User = mongoose.model("user", userSchema);

// userSchema.pre("save", function(next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   const salt = bcrypt.genSaltSync(10);
//   this.password = bcrypt.hashSync(this.password, salt);
//   next();
// });

module.exports = User;
