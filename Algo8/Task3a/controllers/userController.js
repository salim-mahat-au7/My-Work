//Models
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//validate
const validateForgotPassword = require("../validation/forgotPassword");


//fuction
module.exports = {
 
  userDelete: async (req, res, next) => {
    try {
      //validating the given input
      const { errors, isValid } = validateForgotPassword(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      // given email
      const { email } = req.body;
      //user data
      const user = await User.findOne({ email });
      //checking weather email is present or not
      if (!user) {
        errors.email = "Email doesnt not exist";
        return res.status(400).json(errors.email);
      }
      //deleting the user account from bd
      await User.deleteOne({ email });
      //success message
      return res.status(200).json({ message: "Account deleted successfully" });
    } catch (err) {
      console.log("Error in Deleting the account", err.message);
      return res.status(400).json({
        message: `Error in Deleting the account ${err.message}`,
      });
    }
  },


  generateRefreshToken: async (req, res) => {
    try {
     const { refreshToken }= req.body;
     if (!refreshToken || !refreshTokens.includes(refreshToken)){
       return res.status(403).json({message: "User not authenticatet"})
     }
     jwt.verify(refreshToken, "refresh", (err, user) => {
       if (!err){
          
          const payload = { id: user.id, user: user };
          let accessToken = jwt.sign(payload,"access",{expiresIn: "20s"});
           return res.status(201).json({ accessToken})
       }else{
         return res.status(403).json({message: "User not authenticatet"})
       }
     })

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error!" });
    }
  },

  logout : async (req, res) => {
    try {
      //delete the refresh token saved in database:
      const { refreshToken } = req.body;
      await Token.findOneAndDelete({ token: refreshToken });
      return res.status(200).json({ success: "User logged out!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error!" });
    }
  },

};
