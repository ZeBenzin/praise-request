import axios from "axios";

const BASE_PATH = "/praise";

export const searchRepos = (queryString, pageNumber = 1) => {
  return axios.get(
    `${BASE_PATH}/repo?q=${queryString}&per_page=9&page=${pageNumber}`
  );
};

export const getRepoById = id => {
  return axios.get(`${BASE_PATH}/repo/${id}`);
};
