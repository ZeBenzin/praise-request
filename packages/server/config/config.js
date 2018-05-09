const config = {
  JWT_SECRET:
    process.env.NODE_ENV === "production" ? process.env.JWT_SECRET : "dev_token"
};

module.exports = {
  config
};
