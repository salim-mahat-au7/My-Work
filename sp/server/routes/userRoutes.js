const { Router } = require("express");
const passport = require("passport");

//route instance
const router = Router();

//---------------------------- user auth controller function ---------------------------------------- 

const { userRegister } = require("../controllers/userController");
//
const {
  viewAllProduct,
  viewCatProduct,
} = require("../controllers/productController");

// user routes
router.post("/userregister", userRegister);
//
router.get("/viewallproduct", viewAllProduct);
//
router.get("/viewcatproduct/:cname", viewCatProduct);

//exporting the user routes
module.exports = router;
