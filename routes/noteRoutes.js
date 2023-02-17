const express = require("express");

const noteRouter = express.Router();

const auth = require("../middleware/auth");

const noteController = require("../controllers/noteController");

noteRouter.route("/").post(auth.verifyToken, noteController.createNote);

module.exports = noteRouter;
