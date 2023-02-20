const express = require("express");

const noteRouter = express.Router();

const auth = require("../middleware/auth");

const noteController = require("../controllers/noteController");

noteRouter
  .route("/")
  .post(auth.verifyToken, noteController.createNote)
  .get(auth.verifyToken, noteController.getNotes);

noteRouter
  .route("/:id")
  .get(auth.verifyToken, noteController.getSingleNote)
  .patch(auth.verifyToken, noteController.updateNote)
  .delete(auth.verifyToken, noteController.deleteNote);

module.exports = noteRouter;
