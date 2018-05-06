import axios from "axios";

export const createUser = user => {
  return axios.post("/praise/user", user);
};

export const authenticateUser = credentials => {
  return axios.post("/praise/signin", credentials).then(({ data }) => {
    axios.defaults.headers.common["Authorization"] = data.token;
    localStorage.setItem("praiseRequestToken", data.token);
  });
};

export const getSessionStatus = () => {
  const token = localStorage.getItem("praiseRequestToken");
  axios.defaults.headers.common["Authorization"] = token;
  return axios.get("/praise/session");
};
