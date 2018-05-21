const crypto = require("crypto");
const queryString = require("query-string");
const config = require("../config/config");
const moment = require("moment");
const axios = require("axios");

const monitoredTransactions = {};
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
  body.signature = signature;

  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
  console.log("POST - ", url, body);
  return axios.post(url, body).then(response => {
    console.log("Response - ", response.data.data.data);
    return response;
  });
};

const getRequest = (endpoint, params) => {
  const combinedParams = combineParams(params);
  const queryString = generateQueryString(endpoint, combinedParams);
  const signature = generateSignature(queryString);
  const url = `${
    config.OST_API_BASE_PATH
  }${queryString}&signature=${signature}`;

  console.log("GET - ", url);
  return axios.get(url).then(response => {
    console.log("Response - ", response.data.data.data);
    return response;
  });
};

const updateTransactionStatuses = () => {
  if (!Object.keys(monitoredTransactions).length) {
    return;
  }

  listTransactions({ uuids: Object.keys(monitoredTransactions) }).then(
    ({ data }) => {
      const promises = [];
      const transactions = data.data.transactions;
      if (!transactions.length) {
        return;
      }
      transactions.forEach(tx => {
        if (tx.status === COMPLETE || tx.status === FAILED) {
          const cb = monitoredTransactions[tx.id].callback;
          stopMonitoringTransaction(tx.id);
          promises.push(cb(tx));
        }
      });
      return Promise.all(promises).then(data => {
        statusCheckInterval = setTimeout(updateTransactionStatuses, 1000);
        return Promise.resolve();
      });
    }
  );
};

const monitorTransaction = (uuid, callback) => {
  monitoredTransactions[uuid] = {
    callback
  };

  statusCheckInterval = setTimeout(updateTransactionStatuses, 1000);
};

const stopMonitoringTransaction = uuid => {
  delete monitoredTransactions[uuid];
};

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

const createUser = ({ name }) => {
  const sanitizedUserName = sanitizeUserName(name);
  return postRequest("/users/", { name: sanitizedUserName });
};

const getUser = ({ id }) => {
  return getRequest("/users/", { id });
};

const executeTransaction = ({ to_user_id, from_user_id, action_id }) => {
  return postRequest("/transactions/", {
    to_user_id,
    from_user_id,
    action_id
  });
};

const listTransactions = ({ uuids }) => {
  return getRequest("/transactions", { id: uuids, limit: 100 });
};

module.exports = {
  createUser,
  getUser,
  executeTransaction,
  monitorTransaction,
  stopMonitoringTransaction
};
