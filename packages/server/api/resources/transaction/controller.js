const moment = require("moment");
const User = require("../user/model");
const userController = require("../user/controller");
const utils = require("../../../utils/ost-service");
const socketMap = require("../../../socket-map");
const config = require("../../../config/config");
const ostService = require("../../../utils/ost-service");
const axios = require("axios");

const onTransactionStatusChanged = transaction => {
  if (transaction.status === "complete") {
    const fromUserBalancePromise = ostService.getUser(transaction.from_user_id);
    const toUserBalancePromise = ostService.getUser(transaction.to_user_id);

    Promise.all([fromUserBalancePromise, toUserBalancePromise], data => {
      const fromBalance = data[0].token_balance;
      const toBalance = data[1].token_balance;

      socketMap[transaction.from_user_id].socket.emit("balance", fromBalance);
      socketMap[transaction.to_user_id].socket.emit("balance", toBalance);
    });
  }
};

const createTransaction = (req, res, next) => {
  const toAccount = User.findOne({ ghUserName: req.body.to.ghUserName }).then(
    account => {
      if (!account) {
        const url = `${config.GITHUB_BASE_PATH}/user/${req.body.to.ghUserName}`;
        return axios.get(url).then(data => {
          if (data.data) {
            return userController.create(req.body.to, next).then(model => {
              return model;
            });
          }
        });
      }
      return account;
    }
  );

  const fromAccount = User.findOne({ ghUserName: req.body.from.ghUserName });

  Promise.all([toAccount, fromAccount])
    .then(accounts => {
      const to_uuid = accounts[0]._doc.ostId;
      const from_uuid = accounts[1]._doc.ostId;
      const transaction_kind = "praise";
      return ostService.executeTransaction({
        to_uuid,
        from_uuid,
        transaction_kind
      });
    })
    .then(({ data }) => {
      ostService.monitorTransaction(
        data.transaction.id,
        onTransactionStatusChanged
      );
      return res.status(200).json(data);
    })
    .catch(err => res.json({ code: 400, message: err.message }));
};

module.exports = { createTransaction };
