const Note = require("../models/noteModel");
const User = require("../models/userModel");
exports.createNote = async function (req, res) {
  try {
    const user = await User.findById(req.user.id);
    const { title, content } = req.body;

    const noteDetails = {
      title: title,
      content: content,
      owner: req.user.id,
    };
    const note = new Note(noteDetails);
    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote._id);
    await user.save();
    res.status(201).json({
      status: "success",
      data: { note },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getNote = async function (req, res) {
  try {
    res.status(201).json({
      status: "success",
      data: "not ready...",
    });
  } catch (err) {
    console.log(err);
  }
};
