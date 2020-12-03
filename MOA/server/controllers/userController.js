//Model
const User = require("../models/user");

//controller functions
module.exports = {
  //-----------------------------------add-user data------------------------------

  addUser: async (req, res, next) => {
    try {
      
      //given data
      const { name, mobile, email, address:{street, locality, city, state, pincode, coordinatesType, coordinates} } = req.body;

      const user = await User.findOne({ mobile });
      //checks weather the user is already exist
      if (user) {
        // errors.mobile  = "Mobile Number already exist";
        return res.status(400).json("Mobile Number already exist" );
      }
      const newUser = await new User({
        name,
        mobile,
        email,
        address:{
          street,
          locality, 
          city, 
          state,
          pincode,
          coordinatesType, 
          coordinates,
        }
      });
      //user data is save to the database
      await newUser.save();
      //success message
      res.status(200).json({
        message:
          newUser,
      });

    } catch (err) {
      console.log("Error in adding user data", err.message);
      return res
        .status(400)
        .json({ message: `Error in adding user data ${err.message}` });
    }
  },

  //----------------------------------update-user data--------------------------

  updateUser: async (req, res, next) => {
    try {
      //given data
      const { name, mobile, email, address:{street, locality, city, state, pincode, coordinatesType, coordinates} } = req.body;
      //user data
      const userData = await User.find({ mobile });
      //checking weather the user is present or not.
      if (userData == 0) {
        return res.status(404).json("User not exist");
      }
      await User.updateOne(
        { mobile: mobile },
        {
          name, email, address:{street, locality, city, state, pincode, coordinatesType, coordinates}
        }
      );
     
      return res.status(200).json({ message: "user data updated succesfully" });
    } catch (err) {
      console.log("Error in userdata update", err.message);
      return res
        .status(400)
        .json({ message: `Error in userdata update ${err.message}` });
    }
  },

   // ===============================user delet======================================

   userDelete: async (req, res, next) => {
    try {

      // given email
      const { mobile} = req.body;
      //user data
      const user = await User.findOne({ mobile });
      //checking weather mobile is present or not
      if (!user) {
        return res.status(400).json("User not exist");
      }
      //deleting the user account from bd
      await User.deleteOne({ mobile });
      //success message
      return res.status(200).json({ message: "Account deleted successfully" });
    } catch (err) {
      console.log("Error in Deleting the account", err.message);
      return res.status(400).json({
        message: `Error in Deleting the account ${err.message}`,
      });
    }
  },
  //==================================view-all-users======================================

  viewAllUsers: async (req, res, next) => {
    try {
      //user data
      const userData = await User.find({});
      //checking weather user is present or not
      if (!userData ) {
        return res.status(404).json("User not exist");
      }
      //success message
      return res.status(200).json({ total : userData.length,  userData  });
    } catch (err) {
      console.log("Error in Displaying the user details", err.message);
      return res.status(400).json({
        message: `Error in  Displaying the user details ${err.message}`,
      });
    }
  },

  //============== view all user by timestatm pagination============================

  viewAllUsersPagination: async (req, res, next) => {
    try {
      //user data
      const { page = 1, limit = 10 } = req.query;
      const userData = await User.find({}).limit(limit * 1).skip((page-1)*limit); 
      //checking weather user is present or not
      if (!userData ) {
        return res.status(404).json("User not exist");
      }
      //success message
      return res.status(200).json({ total : userData.length,  userData});
    } catch (err) {
      console.log("Error in Displaying the user details", err.message);
      return res.status(400).json({
        message: `Error in  Displaying the user details ${err.message}`,
      });
    }
  },
  
  //============== view all user by distance============================

  viewAllUsersDistance: async (req, res, next) => {
    try {

      const cordinates = req.query.long;

      User.aggregate([
        {
          $geoNear: {  
        near: { 
          type: "Point",
          coordinates: [ cordinates ]
        },
        distanceField: "dist.calculated",
        maxDistance: 2,
        spherical: true
          }
        }
      ])

      const userData = await User.find({ })
      //checking weather user is present or not
      if (!userData ) {
        return res.status(404).json("User not exist");
      }
      //success message
      return res.status(200).json({ userData});
    } catch (err) {
      console.log("Error in Displaying the user details", err.message);
      return res.status(400).json({
        message: `Error in  Displaying the user details ${err.message}`,
      });
    }
  },


};

