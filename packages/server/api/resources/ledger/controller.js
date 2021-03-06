const ostService = require("../../../utils/ost-service");
const User = require("../user/model");

const getLedger = (req, res) => {
  const page_no = req.query.page_no || 1;
  User.findOne({ ghUserId: req.user.id })
    .then(user => {
      if (!user) {
        res.status(404).send(`User ${req.user.id} not found.`);
      }

      return ostService.getLedger({ user_id: user.ostUuid, page_no });
    })
    .then(results => {
      res.status(200).json(results.data);
    })
    .catch(err => res.status(400).send(err.message));
};

module.exports = { getLedger };
