const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Model
const Owner = require("../models/owner");

//Config key fot token
const keys = require("../config/keys");

//Validation
const validateLoginInput = require("../validation/login");

module.exports = {
  //----------------------------super-superadmin-login-clear------------------------------------

  ownerLogin: async (req, res) => {
    try {
      //validate
      const { errors, isValid } = validateLoginInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      //given data
      const { email, password } = req.body;
      //owner data
      const owner = await Owner.findOne({ email });
      //checking weather the given is present or not
      if (!owner) {
        errors.email = "Email doesnt not exist";
        return res.status(404).json(errors.email);
      }
      //comparinig the given password with hashed password
      const isCorrect = await bcrypt.compare(password, owner.password);
      if (!isCorrect) {
        errors.password = "Invalid Credentials";
        return res.status(404).json(errors.password);
      }
      //payload data
      const payload = { id: owner.id, email: owner.email, role:owner.role };
      //genrating the jwt token and sending as response
      jwt.sign(payload, keys.secretKey, { expiresIn: 86400 }, (err, token) => {
        res.json({
          status: 200,
          success: true,
          token: token,
        });
      });
    } catch (err) {
      console.log("Error in ownerLogin", err.message);
      return res
        .status(400)
        .json({ message: `Error in ownerLogin ${err.message}` });
    }
  },
};

//----------------------------------------------------------------------------------------------
