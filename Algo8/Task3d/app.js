const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// importing userdefine functions
require("./database/MongoDB");
const employeeRouter = require("./routers/employeeRouter");

const PORT = process.env.PORT || 3000;

const app = express();

//Set Security HTTP Headers
app.use(helmet());

// Limit Request From Same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, Please try again in an hour",
});
app.use("/api", limiter);


// middleware
app.use(express.json()); 
app.use(morgan("tiny")); 
app.use("/api", employeeRouter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against xss(cross sight scricpting) malesious data from html code
app.use(xss());

//prevent Http parameter pollution many  query at a time
app.use(hpp());


// server created
app.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`);
});
