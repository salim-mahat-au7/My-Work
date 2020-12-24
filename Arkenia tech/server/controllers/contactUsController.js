//Models
const Contact = require("../models/contactus");

//Validation
const validateRegisterInput = require("../validation/register");

//function
module.exports = {
  //-------------------------------------contact us form-----------------------------

  contactUs: async (req, res, next) => {
    try {
      // validate the form
      const { errors, isValid } = validateRegisterInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      //given data
      const { name, email, message } = req.body;
                //contact us data
      const user = await Contact.findOne({ email });
      //checks weather the contact is already exist
      if (user) {
        errors.email = "Email already exist";
        return res.status(400).json(errors.email);
      }

      const newUser = await new Contact({
        name,
        email,
        message,
      });
      //contact data is save to the database
      await newUser.save();
      //success message
      res.status(200).json({
        message:
          "Thanks for your interest. We will revert you in 24 hours..!",
      });
      
    } catch (err) {
      console.log("Error in contact data", err.message);
      return res
        .status(400)
        .json({ message: `Error in userRegister ${err.message}` });
    }
  },
 
};

