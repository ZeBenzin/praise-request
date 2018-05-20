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

export const registerWithGitHub = () => {
  const client_id = "08f64958183eb1761115";
  const redirect_uri = "http://localhost:3000/auth/github/callback";
  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=user`;
  window.location.replace(url);
};

export const getGitHubAuthToken = authCode => {
  return axios
    .get(`/praise/user/githubtoken?code=${authCode}`)
    .then(({ data }) => {
      axios.defaults.headers.common["Authorization"] = data.token;
      localStorage.setItem("praiseRequestToken", data.token);
    })
    .catch(err => console.error(err));
};
