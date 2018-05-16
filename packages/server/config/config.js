const config = {
  JWT_SECRET:
    process.env.NODE_ENV === "production"
      ? process.env.JWT_SECRET
      : "dev_token",
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET
};

module.exports = {
  config
};
