const ostService = require("../../../utils/ost-service");

const getLedger = req => {
  return ostService.getLedger({ user_id: req.user.id });
};

module.exports = { getLedger };
