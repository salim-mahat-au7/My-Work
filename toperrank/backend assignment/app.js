const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const passport = require("passport");
const fileupload = require("express-fileupload");

const dotenv = require("dotenv");
dotenv.config();
require("./database/mongodb");

//MIDDILWARES
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

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against xss(cross sight scricpting) malesious data from html code
app.use(xss());

//prevent Http parameter pollution many  query at a time
app.use(hpp());


// app.use(cookieParser());

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

//temp file declaration
app.use(
    fileupload({
      useTempFiles: true,
      limits: { fileSize: 50 * 1024 },
    })
  );


// // Routes
// const publicRoutes = require("./routes/publicRouter");
const ownerRoutes = require("./routes/ownerRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const superAdminRoutes = require("./routes/superAdminRoutes");
// const homeRoutes = require("./routes/homeRoutes");

//Passport Middleware
app.use(passport.initialize());

//Passport Config.
require("./config/passport")(passport);

//Logger
app.use(morgan("tiny"));

// //ROUTES
// app.use("/api/public", publicRoutes);
app.use("/api/owner", ownerRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/superadmin", superAdminRoutes);
// app.use("/api/home", homeRoutes);

//Catching 404 Error
app.use((req, res, next) => {
  const error = new Error("INVALID ROUTE");
  error.status = 404;
  next(error);
});

//Error handler function
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});



if(process.env.NODE_ENV==="production"){
  app.use(express.static('client/build'))
  const path = require('path')
  app.get('*',(req,res)=>{
      res.sendFile(path.join(__dirname,'client','build','index.html'))
  })
}


//server runing port
const PORT = process.env.PORT || 5000;
//server created
app.listen(PORT, () => {
  console.log(`Server Started ${PORT}`);
});
