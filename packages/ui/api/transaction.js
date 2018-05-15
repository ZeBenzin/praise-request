import axios from "axios";

export const executeTransaction = pr => {
  const body = {
    to: {
      userId: pr.user.id,
      userName: pr.user.login
    },
    from: {
      userId: 6853597,
      userName: "ZeBenzin"
    }
  };

  return axios.post("/praise/transaction", body);
};
