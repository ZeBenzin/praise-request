import axios from "axios";

export const getTransactions = ({ pageNo = 1 }) => {
  console.log("pageNo", pageNo);
  return axios
    .get(`/praise/ledger?page_no=${pageNo}`)
    .then(results => results.data.data);
};
