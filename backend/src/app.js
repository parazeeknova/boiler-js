const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/AppError");
const GlobalErrorHandler = require("./controllers/errorController");

const userRouter = require("./routes/userRouter");

const app = express();

// MORGAN MIDDLEWARE FOR DEVELOPMENT
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// RESUEST BODY PARSER
app.use(express.json());

// TOUR route
app.use("/user", userRouter);

// HANDELING UNHANDELED ROUTES
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// GLOBAL ERROR HANDLER
app.use(GlobalErrorHandler);

module.exports = app;
