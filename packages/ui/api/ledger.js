import axios from "axios";

export const getTransactions = () => {
  return axios.get("/praise/ledger");
};
