//File Handler
const cloudinary = require("../utils/cloudinary");
//Model
const Category = require("../models/category");
//Validation
const validateImage = require("../validation/imgvalidation");

//controller functions
module.exports = {
  //-----------------------------------add-category-admin--------------------------------

  addCategory: async (req, res, next) => {
    try {
      //given data
      const { cname } = req.body;
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
          await Category.create({
            cname,
            cimage: result.secure_url,
          });
          return res
            .status(200)
            .json({ message: "Category added Sucessfully" });
        }
      );
    } catch (err) {
      console.log("Error in adding category", err.message);
      return res
        .status(400)
        .json({ message: `Error in adding category ${err.message}` });
    }
  },

  //------------------------------------category-status-admin-------------------------------

  categoryStatus: (req, res, next) => {
    try {
      //given data
      const { cname } = req.body;
      //category data
      Category.findOneAndUpdate(
        { cname: cname },
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

//=====================================================================================
