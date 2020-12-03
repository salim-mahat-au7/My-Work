const express = require("express");
const morgan = require("morgan");


const dotenv = require("dotenv");
dotenv.config();
require("./database/mongodb");

//MIDDILWARES
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");

//Logger
app.use(morgan("tiny"));

//ROUTES

app.use("/api/user", userRoutes);

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


//server runing port
const PORT = process.env.PORT || 5000;
//server created
app.listen(PORT, () => {
  console.log(`Server Started ${PORT}`);
});
