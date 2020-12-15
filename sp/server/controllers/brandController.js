//File Handler
const cloudinary = require("../utils/cloudinary");
//Model
const Brand = require("../models/brand");
//Validation
const validateImage = require("../validation/imgvalidation");

//controller functions
module.exports = {
  //-----------------------------------add-brand-admin--------------------------------

  addBrand: async (req, res, next) => {
    try {
      //given data
      const { bname } = req.body;
      //reading the image file
      const file = req.files.file;
      const errors = validateImage(file);
      if (errors != null) {
        return res.status(400).json(errors);
      }
      //uploading image to cloud
      await cloudinary.uploader.upload(
        file.tempFilePath,
        { resource_type: "image" },
        async function (err, result) {
          //Data is saved to the database with image url
          await Brand.create({
            bname,
            bimage: result.secure_url,
          });
          return res.status(200).json({ message: "Brand added Sucessfully" });
        }
      );
    } catch (err) {
      console.log("Error in adding brand", err.message);
      return res
        .status(400)
        .json({ message: `Error in adding brand ${err.message}` });
    }
  },
  //--------------------------------brand status----------------------
  brandStatus: (req, res, next) => {
    try {
      //given data
      const { cname } = req.body;
      //brand data
      Brand.findOneAndUpdate(
        { bname: bname },
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
//---------------------------------------------------------------------------------
