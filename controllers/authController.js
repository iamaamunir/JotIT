const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { omit } = require("lodash");
const CONFIG = require("../config/config");

exports.signup = async function (req, res) {
  try {
    // Get user input
    const { name, email, password, passwordConfirm } = req.body;

    // Validate user input
    if (!(email && password && name && passwordConfirm)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email: email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    // encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      name,
      email, // sanitize: convert email to lowercase
      //   password: encryptedPassword,
      password,
      passwordConfirm,
    });

    // Create token
    const token = jwt.sign({ user_id: user._id, email }, CONFIG.TOKEN_KEY, {
      expiresIn: "2h",
    });
    // save user token
    user.token = token;

    // return new user
    res
      .status(201)
      .json(omit(user.toObject(), ["password", "passwordConfirm"]));
  } catch (err) {
    console.log(err);
  }
};
