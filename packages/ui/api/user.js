import axios from "axios";

export const createUser = user => {
  return axios.post("/praise/user", user);
};

export const authenticateUser = credentials => {
  return axios.post("/praise/signin", credentials).then(({ data }) => {
    axios.defaults.headers.common["Authorization"] = data.token;
  });
};
