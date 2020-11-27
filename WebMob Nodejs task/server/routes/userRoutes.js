const { Router } = require("express");
const passport = require("passport");

//route instance
const router = Router();

//---------------------------- user auth controller function -------------------------

const {
  userRegister,
  userLogin,
} = require("../controllers/userAuthController");

//---------------------------- user controller function ----------------------------

const { userDelete } = require("../controllers/userController");


const {
  addProduct,
  updateProduct,
  viewAllProduct,
} = require("../controllers/productController");

// user routes

router.post("/register", userRegister);


router.post("/login", userLogin);


router.post(
  "/userDelete",
  passport.authenticate("jwt", { session: false }),
  userDelete
);


router.post(
  "/addproduct",
  passport.authenticate("jwt", { session: false }),
  addProduct
);


router.post(
  "/productupdate",
  passport.authenticate("jwt", { session: false }),
  updateProduct
);

router.get("/viewallproduct", viewAllProduct);

//exporting the user routes
module.exports = router;
