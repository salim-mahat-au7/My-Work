const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//Models
const User = require("../models/user");

const cloudinary = require("../utils/cloudinary");

//Email
const { sendMailRG, sendMailFP } = require("../utils/userNodemailer");

//Config
const keys = require("../config/keys");

//Validation
const validateLoginInput = require("../validation/login");
const validateRegisterInput = require("../validation/register");
const validateForgotPassword = require("../validation/forgotPassword");
const validateImage = require("../validation/imgvalidation");
const validateOTP = require("../validation/otpValidation");


//function
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

      //reading the image file
      const file = req.files.file;
      //const file = req.files.image;
      const error = validateImage(file);
      if (error != null) {
        return res.status(400).json(errors);
      }

      await cloudinary.uploader.upload(
        file.tempFilePath,
        { resource_type: "image" },
        async function (err, result){
                //user data
      const user = await User.findOne({ email });
      //checks weather the user is already exist
      if (user) {
        errors.email = "Email already exist";
        return res.status(400).json(errors.email);
      }
      //hashing the password and storing into variable
      const hashedPassword = await bcrypt.hash(password, 10);

      //token generation
      const token = jwt.sign({ name, email }, keys.secretKey, {
        expiresIn: 3600,
      });
      //sending a verfication mail using nodemailer
      await sendMailRG(req.body.email, token, "REGISTER");
      //user data
      const newUser = await new User({
        name,
        email,
        password: hashedPassword,
        imgUrl:result.secure_url,
      });
      //user data is save to the database
      await newUser.save();
      //success message
      res.status(200).json({
        message:
          "Please check your Email, click the link to activate your account",
      });
        }


      )
    } catch (err) {
      console.log("Error in userRegister", err.message);
      return res
        .status(400)
        .json({ message: `Error in userRegister ${err.message}` });
    }
  },

  //--------------------------------user email conformation----------------------

  userConfirmation: (req, res, next) => {
    try {
      const confirmToken = req.params.token;
      const { email } = jwt.verify(confirmToken, keys.secretKey);
      User.findOneAndUpdate(
        { email: email },
        { isConfirmed: true },
        (err, doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          }
          return res.status(200).json({
            message:
              "email verification Successfull now u can access your account ",
          });
        }
      );
    } catch (e) {
      console.log(e.message);
      return res.status(400).send("Email confirmation issue");
    }
  },

  // ----------------------------Resending-Token--------------------------------

  verifyResendToken: async (req, res, next) => {
    try {
      //validate the form
      const { errors, isValid } = validateForgotPassword(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      //given data
      const { email } = req.body;
      //user data
      const user = await User.findOne({ email });
      //checks weather the user is already exist
      if (!user) {
        errors.email = "Email not exist";
        return res.status(400).json(errors.email);
      }
      //token generation
      const token = jwt.sign({ email }, keys.secretKey, {
        expiresIn: 600,
      });
      //sending a verfication mail using nodemailer
      await sendMailRG(req.body.email, token, "REGISTER");
      //success message
      res.status(200).json({
        message:
          "Please check your Email, click the link to activate your account",
      });
    } catch (err) {
      console.log("Error in Token Resending", err.message);
      return res
        .status(400)
        .json({ message: `Error in Token Resending ${err.message}` });
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
      //check weather the user is verified the mail
      if (user.isConfirmed != true) {
        errors.user = "Please verify you mail";
        return res.status(400).json(errors.user);
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

  //------------------------------forgot-password--------------------------------

  forgotPassword: async (req, res, next) => {
    try {
      //validate
      const { errors, isValid } = validateForgotPassword(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      //given data
      const { email } = req.body;
      //user data
      const user = await User.findOne({ email });
      //checking weather the user is present or not
      if (!user) {
        errors.email = "Email Not found, Provide registered email";
        return res.status(400).json(errors.email);
      }
      //genrating the OTP function
      function generateOTP() {
        var digits = "0123456789";
        let OTP = "";
        for (let i = 0; i < 6; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
      }
      //calling the genrating the OTP function
      const OTP = await generateOTP();
      user.otp = OTP;
      //saving the data to db
      await user.save();
      //sending the OTP to the user using nodemailer
      await sendMailFP(user.email, OTP, "OTP");
      //helper
      const helper = async () => {
        user.otp = "";
        await user.save();
      };
      setTimeout(function () {
        helper();
      }, 1800000);
      //success message
      res.status(200).json({ message: "check your registered email for OTP" });
    } catch (err) {
      console.log("Error in sending email", err.message);
      return res
        .status(400)
        .json({ message: `Error in generateOTP${err.message}` });
    }
  },

  //------------------------------posting-otp -------------------------

  postOTP: async (req, res, next) => {
    try {
      //validate
      const { errors, isValid } = validateOTP(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      //given data
      const { email, otp, newPassword, confirmNewPassword } = req.body;
      //user data
      const user = await User.findOne({ email });
      //checking weather the user is present or not
      if (!user) {
        errors.email = "Email Not found, Provide registered email";
        return res.status(400).json(errors.email);
      }
      //checking weather the given otp is same in db
      if (user.otp != otp) {
        errors.otp = "Invalid OTP, check your email again";
        return res.status(400).json(errors.otp);
      }
      //checking weather the given is expried
      if (user.otp === "") {
        errors.exp = "OTP has expired";
        return res.status(404).json(errors.exp);
      }
      //comparing the given both newpass and conpass are same
      if (newPassword !== confirmNewPassword) {
        errors.confirmNewPassword = "Password Mismatch";
        return res.status(404).json(errors.confirmNewPassword);
      }
      //hashing the given new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      //success message
      res.status(200).json({ message: "Password Changed Successfully" });
    } catch (err) {
      console.log("Error in submitting OTP", err.message);
      return res
        .status(400)
        .json({ message: `Error in postOTP ${err.message}` });
    }
  },

};

//-------------------------------------------------------------------------------
