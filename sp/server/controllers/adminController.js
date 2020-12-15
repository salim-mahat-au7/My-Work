const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Model
const Admin = require("../models/admin");
const Vendor = require("../models/vendor");
const User = require("../models/user");

//Config key fot token
const keys = require("../config/keys");

//controller function
module.exports = {
  //----------------------------admin-login-------------------------------------
  login: async (req, res) => {
    try {
      //given data
      const { email, password } = req.body;
      //admin data
      const admin = await Admin.findOne({ email });
      //checking weather the given is present or not
      if (admin) {
        //comparinig the given password with hashed password
        const isCorrect = await bcrypt.compare(password, admin.password);
        if (!isCorrect) {
          errors.password = "Invalid Credentials";
          return res.status(404).json(errors.password);
        }
        //payload data
        const payload = { id: admin.id, admin: admin, role: admin.role };
        //genrating the jwt token and sending as response
        jwt.sign(
          payload,
          keys.secretKey,
          { expiresIn: 86400 },
          (err, token) => {
            res.json({
              status: 200,
              success: true,
              token: token,
            });
          }
        );
      }
      //vendor data
      const vendor = await Vendor.findOne({ email });
      //
      if (vendor) {
        // comparing the password saved in the database
        const isCorrect = await bcrypt.compare(password, vendor.password);
        //checking password
        if (!isCorrect) {
          errors.password = "Invalid Credentials";
          return res.status(404).json(errors.password);
        }
        //check weather the user is verified the mail
        if (vendor.status != true) {
          errors.vendor = "Please contact admin";
          return res.status(400).json(errors.vendor);
        }
        //payload data
        const payload = { id: vendor.id, vendor: vendor, role: vendor.role };
        //genrate the jwt token
        jwt.sign(payload, keys.secretKey, { expiresIn: 7200 }, (err, token) => {
          res.json({
            success: true,
            token: token,
          });
        });
      }
      //
      const user = await User.findOne({ email });
      //
      if (user) {
        // comparing the password saved in the database
        const isCorrect = await bcrypt.compare(password, user.password);
        //checking password
        if (!isCorrect) {
          errors.password = "Invalid Credentials";
          return res.status(404).json(errors.password);
        }
        //check weather the user is verified the mail
        if (user.status != true) {
          errors.user = "Please contact admin";
          return res.status(400).json(errors.user);
        }
        //payload data
        const payload = { id: user.id, user: user, role: user.role };
        //genrate the jwt token
        jwt.sign(payload, keys.secretKey, { expiresIn: 7200 }, (err, token) => {
          return res.json({
            success: true,
            token: token,
          });
        });
      }
      //
      if (!admin && !vendor && !user) {
        err.message = "Email doesnt not exist";
        return res.status(404).json(err.message);
      }
    } catch (err) {
      console.log("Error in userLogin", err.message);
      return res.status(400).json({ message: `Error in Login ${err.message}` });
    }
  },
};

//====================================================================================================//
