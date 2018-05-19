const axios = require("axios");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const config = require("../../../config/config");
const utils = require("../../../utils/auth");
const User = require("./model");

const sanitizeUserName = userName => {
  let strippedName = userName.replace(/[^\w\d\s]/g, "");
  if (strippedName.length < 3) {
    strippedName = `${strippedName}000`;
  }

  if (strippedName.length > 20) {
    strippedName = strippedName.substring(0, 20);
  }

  return strippedName;
};

const createOstUser = body => {
  const account = body;
  const ostLegalUserName = sanitizeUserName(account.ghUserName);
  const timestamp = moment().unix();
  const queryString = utils.generateQueryString(timestamp, "/users/create", {
    name: ostLegalUserName
  });
  const signature = utils.generateSignature(queryString);
  const url = `https://playgroundapi.ost.com${queryString}&signature=${signature}`;
  const payload = {
    api_key: config.OST_API_KEY,
    name: ostLegalUserName,
    request_timestamp: timestamp,
    signature
  };
  return axios.post(url, payload).then(({ data }) => {
    const ostUser = data.data.economy_users[0];
    return User.findOneAndUpdate(
      { ghUserId: body.ghUserId },
      { ostUuid: ostUser.uuid }
    );
  });
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json({ code: 400, error: err.message }));
};

const createUser = (req, res) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(err => {
      res.status(400).json({ code: 400, error: err.message });
    });
};

const getGitHubToken = (req, res) => {
  const client_id = config.GITHUB_CLIENT_ID;
  const client_secret = config.GITHUB_CLIENT_SECRET;
  const code = req.query.code;
  const url = `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;
  let userObject;
  axios
    .post(url)
    .then(data => {
      const token = data.data.replace();
      const endIndex = data.data.indexOf("&");
      const extractedToken = token.substring(13, endIndex);
      return axios.get(
        `https://api.github.com/user?access_token=${extractedToken}`
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
        return User.create(userObject);
      }
      return user;
    })
    .then(user => {
      if (!user._doc.ostUuid) {
        return createOstUser(user._doc);
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
