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
    const reducedItems = items.map(item => item.name);

    res.json({ data: reducedItems });
  });
};

const getById = (req, res) => {};

module.exports = { getByQuery };
