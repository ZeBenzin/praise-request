import axios from "axios";

export const getTransactions = ({ pageNo = 1 }) => {
  return axios
    .get(`/praise/ledger?page_no=${pageNo}`)
    .then(results => results.data.data)
    .catch(err => {
      console.error(err);
      return { transactions: [] };
    });
};
