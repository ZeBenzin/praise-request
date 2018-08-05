import axios from "axios";

export const executeTransaction = ({ id, login }) => {
  const body = {
    toUser: {
      ghUserId: id,
      ghUserName: login
    }
  };

  return axios.post("/praise/transaction", body);
};

export const getTransaction = ({ id }) => {
  return axios
    .get(`praise/transaction/${id}`)
    .then(result => result.data.data)
    .catch(err => {
      console.error(err);
      return { transaction: {} };
    });
};
