//File Handler
const cloudinary = require("../utils/cloudinary");
//Model
const Product = require("../models/product");
//Validation
const validateImage = require("../validation/imgvalidation");

//controller functions
module.exports = {
  //-----------------------------------add-product-vendor--------------------------------

  addProduct: async (req, res, next) => {
    try {
      //user data
      const { vname } = req.user;
      //given data
      const { pname, cname, bname, price, quantity } = req.body;
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
          await Product.create({
            proId: ProductId,
            pname,
            vname,
            cname,
            bname,
            price,
            quantity,
            pimage: result.secure_url,
          });
          return res
            .status(200)
            .json({ message: "product uploaded Sucessfully" });
        }
      );
    } catch (err) {
      console.log("Error in upload product", err.message);
      return res
        .status(400)
        .json({ message: `Error in upload product ${err.message}` });
    }
  },

  //----------------------------------delete-product-by-vendor-----------------------------

  deleteProduct: async (req, res, next) => {
    try {
      //given data
      const { vname } = req.user;
      const { proId } = req.body;
      //checking weather admin is present or not
      const proData = await Product.findOne({ proId });
      //
      if (!proData) {
        errors = "Product doesnt not exist";
        return res.status(404).json(errors);
      }
      //deleting the product from bd
      if (proData.vname == vname) {
        await Product.deleteOne({ proId });
        //success message
        return res
          .status(200)
          .json({ message: "Product deleted successfully" });
      } else {
        return res.status(200).json({ message: "No access to delete" });
      }
    } catch (err) {
      console.log("Error in Deleting the Product", err.message);
      return res.status(400).json({
        message: `Error in Deleting the product ${err.message}`,
      });
    }
  },

  //----------------------------------update-product-by-vendor---------------------------

  updateProduct: async (req, res, next) => {
    try {
      //userdata
      const { vname } = req.user;
      //given data
      const { proId, price, quantity } = req.body;
      //product data
      const proData = await Product.find({ proId });
      //checking weather the product is present or not.
      if (proData == 0) {
        errors = "Product doesnt not exist";
        return res.status(404).json(errors);
      }
      //
      const vpData = [];
      proData.map((pro) => {
        if (pro.vname == vname) {
          vpData.push(pro);
        }
      });
      //
      if (vpData == 0) {
        errors = "Product doesnt not exist";
        return res.status(404).json(errors);
      }
      //
      const dData = [];
      vpData.map((pro) => {
        if (pro.proId == proId) {
          dData.push(pro);
        }
      });
      //
      if (dData == 0) {
        errors = "Product doesnt not exist";
        return res.status(404).json(errors);
      }
      //Data is saved to the database
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

  //---------------------------------product-status-admin-vendor---------------------------

  productStatus: (req, res, next) => {
    try {
      const { pname } = req.body;
      //
      Product.findOneAndUpdate(
        { pname: pname },
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
    } catch (err) {
      console.log("Error in Displaying the product details", err.message);
      return res.status(400).send("Issue in changing status");
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

  //==============================view-product-based-on-category============================

  viewCatProduct: async (req, res) => {
    try {
      //category name from param
      const { cname } = req.params;
      //product data
      const proData = await Product.find({ cname: cname });
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

//=========================================================================================
