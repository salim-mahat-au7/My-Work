const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Models
const User = require("../models/user");

//Config
const keys = require("../config/keys");

//Validation
const validateLoginInput = require("../validation/login");
const validateRegisterInput = require("../validation/register");


module.exports = {
  //-------------------------------------user register-----------------------------

  userRegister: async (req, res, next) => {
    try {
      // validate the form
      const { errors, isValid } = validateRegisterInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      //given data
      const { name, email, password } = req.body;

      const user = await User.findOne({ email });
      //checks weather the user is already exist
      if (user) {
        errors.email = "Email already exist";
        return res.status(400).json(errors.email);
      }
      //hashing the password and storing into variable
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await new User({
        name,
        email,
        password: hashedPassword,
      });
      //user data is save to the database
      await newUser.save();
      //success message
      res.status(200).json({
        message:
          newUser,
      });

    } catch (err) {
      console.log("Error in userRegister", err.message);
      return res
        .status(400)
        .json({ message: `Error in userRegister ${err.message}` });
    }
  },
 
  //--------------------------------user-login-----------------------------------

  userLogin: async (req, res, next) => {
    try {
      //validate
      const { errors, isValid } = validateLoginInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      //given data
      const { email, password } = req.body;
      //user data
      const user = await await User.findOne({ email });
      //checking weather the given email is peresent or not
      if (!user) {
        errors.email = "Email doesnt not exist";
        return res.status(400).json(errors.email);
      }
      // comparing the password saved in the database
      const isCorrect = await bcrypt.compare(password, user.password);
      //checking password
      if (!isCorrect) {
        errors.password = "Invalid Credentials";
        return res.status(404).json(errors.password);
      }
      //payload data
      const payload = { id: user.id, user: user };
      //genrate the jwt token
      jwt.sign(payload, keys.secretKey, { expiresIn: 7200 }, (err, token) => {
        res.json({
          success: true,
          token: token,
        });
      });
    } catch (err) {
      console.log("Error in userLogin", err.message);
      return res
        .status(400)
        .json({ message: `Error in userLogin ${err.message}` });
    }
  },
  
};


