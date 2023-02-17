const express = require("express");
const userRouter = express.Router();

const authController = require("../controllers/authController");
userRouter.route("/signup").post(authController.signup);

module.exports = userRouter;
