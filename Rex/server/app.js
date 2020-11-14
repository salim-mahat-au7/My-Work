const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

require("./config/db");
const sharesRouter = require("./routers/sharesRouter");

//Set Security HTTP Headers
app.use(helmet());

// Limit Request From Same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, Please try again in an hour",
});
app.use("/api", limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against xss(cross sight scricpting) malesious data from html code
app.use(xss());

//prevent Http parameter pollution many  query at a time
app.use(hpp());

//Cors method
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

const PORT = process.env.PORT || 5000;

app.use(express.json()); 
app.use(morgan("tiny")); 
app.use("/api", sharesRouter);

app.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`);
});
