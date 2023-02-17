require("dotenv").config();

const CONFIG = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  NODE_ENV: process.env.NODE_ENV,
  TOKEN_KEY: process.env.TOKEN_KEY,
};
module.exports = CONFIG;
