import axios from "axios";

const BASE_PATH = "/praise";

export const getByRepoId = (repoName, ownerName, queryParams = {}) => {
  const convertedQueryParams = Object.keys(queryParams).map(
    paramKey => `${paramKey}=${queryParams[paramKey]}`
  );

  return axios.get(
    `${BASE_PATH}/repo/${repoName}/${ownerName}/pulls?${convertedQueryParams.join(
      "&"
    )}`
  );
};
