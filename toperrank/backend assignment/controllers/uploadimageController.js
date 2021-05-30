//Model
const UploadImage = require("../models/uploadimage");

const cloudinary = require("../utils/cloudinary");

const validateImage = require("../validation/imgvalidation");

module.exports = {

  // Superadmin Admin upload image at time of update bank and cashpoint
    UploadImage: async (req, res, next) => {
      try{
            //reading the image file
          const file = req.files.uploadimage;
    
          const error = validateImage(file);
          if (error != null) {
           return res.status(406).json({status:406, error:"upload valid photo in png, jpeg, jpg, gif format"});
          }

          await cloudinary.uploader.upload(
            file.tempFilePath,
            { resource_type: "image"},


            async function (err, result){
            const imageData = await UploadImage.create({
                uploadimage:result.secure_url,
            });
  
            await imageData.save();
            //success message
            return res
            .status(201)
            .json({ status:201, message: "Image Uploaded Successfully", Url:imageData.uploadimage });
           }
          )
          
      }catch(err){
          console.log("Error in Uploading Image ", err.error);
    return res
      .status(400)
      .json({ status:400, error: `Error in Uploading Image ${err.error}` });
      }
  },
}