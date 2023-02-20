const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { omit } = require("lodash");
// const bcrypt = require("bcrypt");
const CONFIG = require("../config/config");
const AppError = require("../utils/appError");

exports.signup = async function (req, res, next) {
  try {
    // Get user input
    const { name, email, password, passwordConfirm } = req.body;

    // Validate user input
    if (!(email && password && name && passwordConfirm)) {
      next(new AppError("All input is required", 400));
      // res.status(400).json({status:'fail',message:"All input is required"});
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email: email });

    if (oldUser) {
      next(new AppError("User Already Exist. Please Login", 409));
    }

    const user = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    });
    res
      .status(201)
      // omit the password and password confirm
      .json(omit(user.toObject(), ["password", "passwordConfirm"]));
  } catch (err) {
    next(err);
  }
};

exports.login = async function (req, res, next) {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      next(new AppError("All input is required", 400));
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email: email });

    const validPassword = await user.comparePassword(password);
    if (validPassword) {
      // Create token
      const token = jwt.sign({ id: user._id, email: email }, CONFIG.TOKEN_KEY, {
        expiresIn: "2h",
      });
      // save user token
      user.token = token;
      res.status(200).json({ token: token });
    } else {
      next(new AppError("Invalid credentials", 400));
    }
  } catch (err) {
    next(err);
  }
};
