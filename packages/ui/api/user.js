import axios from "axios";

export const createUser = user => {
  return axios.post("/praise/user", user);
};
