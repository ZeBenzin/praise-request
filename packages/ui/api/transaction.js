import axios from "axios";

export const executeTransaction = pr => {
  const body = {
    to: {
      userId: pr.user.id,
      userName: pr.user.login
    },
    from: {
      userId: 23522360,
      userName: "ZakBrown93"
    }
  };

  return axios.post("/praise/transaction", body);
};
