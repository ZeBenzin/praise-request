const axios = require("axios");
const jwt = require("jsonwebtoken");
const config = require("../../../config/config");
const ostService = require("../../../utils/ost-service");
const User = require("./model");

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json({ code: 400, error: err.message }));
};

const createUser = user => {
  return ostService.createUser({ name: user.ghUserName }).then(({ data }) => {
    const enrichedUser = Object.assign({}, user, {
      ostUuid: data.data.user.id
    });
    return User.create(enrichedUser);
  });
};

const getGitHubToken = (req, res) => {
  const client_id = config.GITHUB_CLIENT_ID;
  const client_secret = config.GITHUB_CLIENT_SECRET;
  const code = req.query.code;
  const url = `${
    config.GITHUB_BASE_PATH
  }/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;
  let userObject;
  axios
    .post(url)
    .then(data => {
      const token = data.data.replace();
      const endIndex = data.data.indexOf("&");
      const extractedToken = token.substring(13, endIndex);
      return axios.get(
        `${config.GITHUB_API_BASE_PATH}/user?access_token=${extractedToken}`
      );
    })
    .then(data => {
      userObject = {
        ghUserName: data.data.login,
        ghUserId: data.data.id
      };
      return User.findOne({ ghUserId: userObject.ghUserId });
    })
    .then(user => {
      if (!user) {
        return createUser(userObject);
      }
      return user;
    })
    .then(user => {
      const token = jwt.sign({ id: user._doc.ghUserId }, config.JWT_SECRET, {
        expiresIn: "12h"
      });
      res.status(200).json({ token });
    })
    .catch(err => {
      res.status(400).send(err);
    });
};

module.exports = { getUserById, createUser, getGitHubToken };
