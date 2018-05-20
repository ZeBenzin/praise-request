import axios from "axios";

export const executeTransaction = ({ id, login }) => {
  const body = {
    toUser: {
      ghUserId: id,
      ghUserName: login
    }
  };

  // return axios.post("/praise/transaction", body);
  return Promise.resolve("yay!");
};
