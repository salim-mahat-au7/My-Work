const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

//Models
const User = require("../models/user");
//Config
const keys = require("../config/keys");

//controller function
module.exports = {
  //-------------------------------------user-register-----------------------------
  userRegister: async (req, res, next) => {
    try {
      //given data
      const { name, email, bio, password } = req.body;
      //user data
      const user = await User.findOne({ email });
      //checks weather the user is already exist
      if (user) {
        errors.email = "Email already exist";
        return res.status(400).json(errors.email);
      }
      //hashing the password and storing into variable
      const hashedPassword = await bcrypt.hash(password, 10);
      //default avatar is set
      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
      //token generation
      const token = jwt.sign({ name, email }, keys.secretKey, {
        expiresIn: 3600,
      });
      //user data
      const newUser = await new User({
        name,
        email,
        bio,
        password: hashedPassword,
        avatar,
      });
      //user data is save to the database
      await newUser.save();
      //success message
      res.status(200).json({
        message: "User registered successfully",
      });
    } catch (err) {
      console.log("Error in userRegister", err.message);
      return res
        .status(400)
        .json({ message: `Error in userRegister ${err.message}` });
    }
  },

  //--------------------------------user-status-admin--------------------------------------

  userStatus: (req, res, next) => {
    try {
      //
      const { email } = req.body;
      //
      User.findOneAndUpdate(
        { email: email },
        { status: true ? { status: false } : { status: true } },
        (err) => {
          if (err) {
            console.log("Something wrong when updating data!");
          }
          return res.status(200).json({
            message: "status changed successfully ",
          });
        }
      );
    } catch (e) {
      console.log(e.message);
      return res.status(400).send("Issue in changing status");
    }
  },
};

//========================================================================================
