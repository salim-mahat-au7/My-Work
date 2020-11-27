//File Handler
const cloudinary = require("../utils/cloudinary");
//Model
const Product = require("../models/product");
//Validation
const validateImage = require("../validation/imgvalidation");

//controller functions
module.exports = {
  //-----------------------------------add-product------------------------------

  addProduct: async (req, res, next) => {
    try {
      //given data
      const { pname, sku, price, category, quantity } = req.body;
      //reading the image file
      const file = req.files.file;
      //const file = req.files.image;
      const errors = validateImage(file);
      if (errors != null) {
        return res.status(400).json(errors);
      }
      //uploading image to cloud
      await cloudinary.uploader.upload(
        file.tempFilePath,
        { resource_type: "image" },
        async function (err, result) {
          function generateProductId() {
            var digits = "0123456789";
            let ProductId = "";
            for (let i = 0; i < 6; i++) {
              ProductId += digits[Math.floor(Math.random() * 10)];
            }
            return ProductId;
          }
          //calling the fuction to create doctor id
          const ProductId = await generateProductId();
          //Data is saved to the database with image url
          const productdata = await Product.create({
            proId: ProductId,
            pname,
            sku,
            price,
            category,
            quantity,
            pimage: result.secure_url,
          });

          await productdata.save();
          return res
            .status(200)
            .json({ message: productdata });
        }
      );
    } catch (err) {
      console.log("Error in Adding product", err.message);
      return res
        .status(400)
        .json({ message: `Error in Adding product ${err.message}` });
    }
  },

  //----------------------------------update-product---------------------------

  updateProduct: async (req, res, next) => {
    try {
      //given data
      const { proId, price, quantity } = req.body;
      //product data
      const proData = await Product.find({ proId });
      //checking weather the product is present or not.
      if (proData == 0) {
        errors = "Product doesnt not exist";
        return res.status(404).json(errors);
      }

      await Product.updateOne(
        { proId: proId },
        {
          price,
          quantity,
        }
      );
      //
      return res.status(200).json({ message: "product updated Sucessfully" });
    } catch (err) {
      console.log("Error in product update", err.message);
      return res
        .status(400)
        .json({ message: `Error in product update ${err.message}` });
    }
  },

  //==================================view-all-product======================================

  viewAllProduct: async (req, res, next) => {
    try {
      //product data
      const proData = await Product.find({});
      //checking weather Product is present or not
      if (!proData) {
        errors.pro = "product doesnt not exist";
        return res.status(404).json(errors.pro);
      }
      //success message
      return res.status(200).json({ message: proData });
    } catch (err) {
      console.log("Error in Displaying the product details", err.message);
      return res.status(400).json({
        message: `Error in  Displaying the product details ${err.message}`,
      });
    }
  },

};

