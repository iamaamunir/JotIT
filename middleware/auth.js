const jwt = require("jsonwebtoken");

const CONFIG = require("../config/config");
const AppError = require("../utils/appError");

exports.verifyToken = (req, res, next) => {
  try {
    if (req.headers.authorization === undefined) {
      next(new AppError("Something is wrong with the server", 500));
    }
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, CONFIG.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    next(err);
  }
};
