const express = require("express");
const morgan = require("morgan");
const CONFIG = require("./config/config");
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const errorHandler = require("./middleware/errorHandler");
const AppError = require("./utils/appError");

const app = express();

const NODE_ENV = CONFIG.NODE_ENV;

app.use(express.json());
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to JotIT Homepage",
  });
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/note", noteRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandler.errorHandler);

module.exports = app;
