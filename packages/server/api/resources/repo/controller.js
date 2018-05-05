const axios = require("axios");
const request = require("request");

const githubBasePath = "https://api.github.com";
const customRequest = request.defaults({
  headers: {
    "User-Agent": "PraiseRequest"
  }
});

const getByQuery = (req, res) => {
  const url = githubBasePath + "/search/repositories?q=" + req.query.q;
  customRequest.get(url, (err, response) => {
    const items = JSON.parse(response.body).items || [];
    res.json({ data: items });
  });
};

const getById = (req, res) => {
  const url = githubBasePath + "/repositories/" + req.params.id;
  customRequest.get(url, (err, response) => {
    res.json({ data: JSON.parse(response.body) });
  });
};

const getPullRequests = (req, res) => {
  const ownerName = req.params.ownerName;
  const repoName = req.params.repoName;
  const convertedQueryParams = Object.keys(req.query).map(
    paramKey => `${paramKey}=${req.query[paramKey]}`
  );
  const url = `${githubBasePath}/repos/${repoName}/${ownerName}/pulls?${convertedQueryParams.join(
    "&"
  )}`;
  axios
    .get(url, {
      headers: { "User-Agent": "PraiseRequest" }
    })
    .then(({ data }) => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.json({ code: err.code, message: err.message });
    });
};

module.exports = { getByQuery, getById, getPullRequests };
