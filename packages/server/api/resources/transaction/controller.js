const User = require("../user/model");
const userController = require("../user/controller");
const socketMap = require("../../../socket-map");
const config = require("../../../config/config");
const ostService = require("../../../utils/ost-service");
const axios = require("axios");

const onTransactionStatusChanged = transaction => {
  const { status, from_user_id, to_user_id } = transaction;
  if (status === "complete") {
    return Promise.all([
      ostService.getUser({ id: from_user_id }),
      ostService.getUser({ id: to_user_id })
    ]).then(data => {
      const fromUser = data[0].data.data.users[0];
      const toUser = data[1].data.data.users[0];
      if (socketMap[toUser.id]) {
        socketMap[toUser.id].socket.emit("balance", toUser.token_balance);
      }

      if (socketMap[fromUser.id]) {
        socketMap[fromUser.id].socket.emit("balance", fromUser.token_balance);
      }

      return Promise.resolve();
    });
  }

  return Promise.resolve();
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
