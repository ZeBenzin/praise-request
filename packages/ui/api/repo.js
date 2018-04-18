import axios from "axios";

export const searchRepos = (queryString) => {
  return axios.get(`/praise/repo?query=${queryString}`);
};
