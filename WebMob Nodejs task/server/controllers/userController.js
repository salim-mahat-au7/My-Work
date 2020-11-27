const bcrypt = require("bcryptjs");
const cloudinary = require("../utils/cloudinary");
//Models
const User = require("../models/user");

//validate
const validateForgotPassword = require("../validation/forgotPassword");


//fuction
module.exports = {
  //------------------------------------user-profile-update----------------------------

  profileUpdate: async (req, res, next) => {
    try {

      //loged in user
      const { _id } = req.user;
      //given name password imgurl
      const { name, password, imgUrl } = req.body;

      //hashing the password and storing into variable
      const hashedPassword = await bcrypt.hash(password, 10);

      const file = req.files.file;

      await cloudinary.uploader.upload(
        file.tempFilePath,
        { resource_type: "image" },
        async function (err, result){
        await User.findOneAndUpdate({ _id }, { name, password: hashedPassword, imgUrl:result.secure_url,});
        //success message
        return res
          .status(200)
          .json({ message: "User Prfile updated successfully" });
        }
      )
    } catch (err) {
      console.log("Error in updating Prfile", err.message);
      return res
        .status(400)
        .json({ message: `Error in updating Prfile ${err.message}` });
    }
  },

  //----------------------------user-acount-delete-----------------------------

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
};
