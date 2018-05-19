const User = require("../user/model");
const userController = require("../user/controller");
const socketMap = require("../../../socket-map");
const config = require("../../../config/config");
const ostService = require("../../../utils/ost-service");
const axios = require("axios");

const onTransactionStatusChanged = transaction => {
  // if (transaction.status === "complete") {
  const fromUserBalancePromise = ostService.getUser({
    id: transaction.from_user_id
  });
  const toUserBalancePromise = ostService.getUser({
    id: transaction.to_user_id
  });

  // return Promise.all([fromUserBalancePromise, toUserBalancePromise], data => {
  //   const fromBalance = data[0].token_balance;
  //   const toBalance = data[1].token_balance;

  //   socketMap[transaction.from_user_id].socket.emit("connection", fromBalance);
  //   socketMap[transaction.to_user_id].socket.emit("connection", toBalance);
  // });

  return fromUserBalancePromise.then(({ data }) => {
    const fromBalance = data.data.users[0].token_balance;
    const fromId = transaction.from_user_id;
    return User.findOne({ ostUuid: fromId }).then(user => {
      return socketMap[user._doc.ghUserId]
        ? socketMap[user._doc.ghUserId].emit("connection", fromBalance)
        : null;
    });
  });
  // return Promise.resolve("HEY!");
  // }

  // return Promise.resolve();
};

const createTransaction = (req, res, next) => {
  const toUser = req.body.toUser;
  const toAccount = User.findOne({ ghUserId: toUser.ghUserId }).then(
    account => {
      if (!account) {
        const url = `${config.GITHUB_API_BASE_PATH}/user/${toUser.ghUserId}`;
        return axios.get(url).then(data => {
          if (data.data) {
            return userController.createUser(toUser);
          }
        });
      }
      return account;
    }
  );

  const fromAccount = User.findOne({ ghUserId: req.user.id });

  Promise.all([toAccount, fromAccount])
    .then(accounts => {
      const to_user_id = accounts[0]._doc.ostUuid;
      const from_user_id = accounts[1]._doc.ostUuid;
      return ostService.executeTransaction({
        to_user_id,
        from_user_id,
        action_id: 30096
      });
    })
    .then(({ data }) => {
      ostService.monitorTransaction(
        data.data.transaction.id,
        onTransactionStatusChanged
      );
      return res.status(200).json(data);
    })
    .catch(err => {
      const code = err.response ? err.response.status : 500;
      res.status(code).json({ code, message: err.message });
    });
};

module.exports = { createTransaction };
