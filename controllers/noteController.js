const Note = require("../models/noteModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
exports.createNote = async function (req, res, next) {
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
    next(err);
  }
};

exports.getNotes = async function (req, res, next) {
  try {
    console.log(req);
    // const currentUserId = req.user.id;
    // console.log(currentUserId);
    // const features = new APIFeatures(
    //   Note.find({ owner: currentUserId }),
    //   req.query
    // )
    //   .sort()
    //   .paginate();
    const notes = await Note.find({ owner: req.user.id });
    // const notes = await features.query;

    if (!notes) {
      return next(new AppError("Note Not Found", 404));
    }

    res.status(200).json({
      status: "success",
      results: notes.length,
      data: {
        notes,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getSingleNote = async function (req, res, next) {
  try {
    const id = req.params.id;
    const currentUserId = req.user.id;
    const note = await Note.findOne({ _id: id, owner: currentUserId }).populate(
      "owner",
      "name"
    );

    if (!note) {
      return next(new AppError("Note Not Found", 404));
    }
    return res.status(200).json({
      status: "success",
      data: {
        note,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateNote = async function (req, res, next) {
  try {
    const body = req.body;
    const id = req.params.id;
    const note = await Note.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!note) {
      return next(new AppError("Note Not Found", 404));
    }
    note.updatedAt = Date.now();
    note.save();
    return res.status(204).json({
      status: "success",
      message: "Update Successfull",
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteNote = async function (req, res, next) {
  try {
    const id = req.params.id;

    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return next(new AppError("Note Not Found", 404));
    }
    return res.status(204).json({
      status: "success",
      message: "Deleted Successfully",
    });
  } catch (err) {
    next(err);
  }
};
