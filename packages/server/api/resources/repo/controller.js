const axios = require("axios");
const request = require("request");

const githubBasePath = "https://api.github.com";
const customRequest = request.defaults({
  headers: {
    "User-Agent": "praise request"
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

module.exports = { getByQuery, getById };
