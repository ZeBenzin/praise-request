const config = {
  JWT_SECRET:
    process.env.NODE_ENV === "production"
      ? process.env.JWT_SECRET
      : "dev_token",
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  OST_API_KEY: process.env.OST_API_KEY,
  OST_API_SECRET: process.env.OST_API_SECRET,
  GITHUB_BASE_PATH: "https://github.com",
  GITHUB_API_BASE_PATH: "https://api.github.com",
  OST_API_BASE_PATH: "https://playgroundapi.ost.com"
};

module.exports = config;
