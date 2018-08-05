import axios from "axios";

export const getUserBalance = () => {
  return axios
    .get("/praise/balance")
    .then(results => results.data.data)
    .catch(err => {
      console.error(err);
      return { balance: {} };
    });
};
