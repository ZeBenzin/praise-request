import axios from "axios";

const BASE_PATH = "/praise";

export const searchRepos = queryString => {
  return axios.get(`${BASE_PATH}/repo?q=${queryString}`);
};

export const getRepoById = id => {
  return axios.get(`${BASE_PATH}/repo/${id}`);
};
