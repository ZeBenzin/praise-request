import axios from "axios";

const BASE_PATH = "/praise";

export const getByRepoId = (repoName, ownerName) => {
  return axios.get(`${BASE_PATH}/repo/${repoName}/${ownerName}/pulls`);
};
