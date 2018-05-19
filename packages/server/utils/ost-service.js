const crypto = require("crypto");
const queryString = require("query-string");
const config = require("../config/config");

const monitoredTransactions = {};
const PROCESSING = "processing";
const COMPLETE = "complete";
const FAILED = "failed";

let statusCheckInterval;

const combineParams = params => {
  const timestamp = moment().unix();
  return Object.assign(
    {},
    {
      api_key: config.OST_API_KEY,
      request_timestamp: timestamp
    },
    params
  );
};

const generateQueryString = (endpoint, params) => {
  const inputParamsString = queryString
    .stringify(params, { arrayFormat: "bucket" })
    .replace(/%20/g, "+");

  return `${endpoint}?${inputParamsString}`;
};

const generateSignature = stringToSign => {
  const buff = new Buffer.from(config.OST_API_SECRET, "utf8");
  const hmac = crypto.createHmac("sha256", buff);
  hmac.update(stringToSign);
  return hmac.digest("hex");
};

const postRequest = (endpoint, params) => {
  const combinedParams = combineParams(params);
  const queryString = generateQueryString(endpoint, combinedParams);
  const signature = generateSignature(queryString);
  const url = `${
    config.OST_API_BASE_PATH
  }${queryString}&signature=${signature}`;
  const body = combinedParams;

  return axios.post(url, body);
};

const getRequest = () => {
  const combinedParams = combineParams(params);
  const queryString = generateQueryString(endpoint, combinedParams);
  const signature = generateSignature(queryString);
  const url = `${
    config.OST_API_BASE_PATH
  }${queryString}&signature=${signature}`;

  return axios.get(url);
};

const updateTransactionStatuses = () => {
  listTransactions(Object.keys(monitoredTransactions)).then(({ data }) => {
    data.transactions.forEach(tx => {
      if (tx.status === COMPLETE || tx.status === FAILED) {
        monitoredTransactions[tx.id].callback(tx);
        stopMonitoringTransaction(tx.id);
      }
    });
  });
};

const monitorTransaction = (uuid, callback) => {
  monitoredTransactions[uuid] = {
    callback
  };

  statusCheckInterval = setInterval(updateTransactionStatuses, 1000);
};

const stopMonitoringTransaction = uuid => {
  delete monitoredTransactions[uuid];
  if (Object.keys(monitoredTransactions).length === 0) {
    clearInterval(statusCheckInterval);
  }
};

const createUser = ({ name }) => {
  const sanitizedUserName = sanitizeUserName(name);
  postRequest("/users/create", { name });
};

const getUser = ({ id }) => {
  getRequest("/users/", { id });
};

const executeTransaction = ({ to_uuid, from_uuid, transaction_kind }) => {
  postRequest("/transaction-status/execute", {
    to_uuid,
    from_uuid,
    transaction_kind
  });
};

const listTransactions = ({ uuids }) => {
  getRequest("/transactions", { id: uuids });
};

module.exports = {
  createUser,
  getUser,
  executeTransaction,
  monitorTransaction,
  stopMonitoringTransaction
};
