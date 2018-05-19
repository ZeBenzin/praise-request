import axios from "axios";

export const executeTransaction = pr => {
  const body = {
    toUser: {
      ghUserId: pr.user.id,
      ghUserName: pr.user.login
    }
  };

  return axios.post("/praise/transaction", body);
};
