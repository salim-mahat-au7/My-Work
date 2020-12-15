const { Router } = require("express");
const passport = require("passport");

//to protect the route
const { restrictTo } = require("../middleware/protect");

const router = Router();

//-------------------------- Admin Controller function ----------------------

const { login } = require("../controllers/adminController");

//-------------------------- vendor Controller function ----------------------

const {
  vendorRegister,
  vendorStatus,
} = require("../controllers/vendorController");

//-------------------------- user Controller function ----------------------

const { userRegister, userStatus } = require("../controllers/userController");

//-------------------------- Category Controller function --------------------

const {
  addCategory,
  categoryStatus,
} = require("../controllers/categoryController");

//-------------------------- Brand Controller function ----------------------
const { addBrand, brandStatus } = require("../controllers/brandController");

//-------------------------- Product Controller function ----------------------
const {
  addProduct,
  productStatus,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

//-----------------------------------------------------------------------------

//admin routes
router.post("/login", login);

//admin routes//vendor
router.post(
  "/addvendor",
  passport.authenticate("jwt", { session: false }),
  restrictTo("admin"),
  vendorRegister
);
//
router.post(
  "/vendorstatus",
  passport.authenticate("jwt", { session: false }),
  restrictTo("admin"),
  vendorStatus
);

//admin routes//user
router.post(
  "/adduser",
  passport.authenticate("jwt", { session: false }),
  restrictTo("admin"),
  userRegister
);
//
router.post(
  "/userstatus",
  passport.authenticate("jwt", { session: false }),
  restrictTo("admin"),
  userStatus
);

//admin routes // category
router.post(
  "/addcategory",
  passport.authenticate("jwt", { session: false }),
  restrictTo("admin"),
  addCategory
);
//
router.post(
  "/categorystatus",
  passport.authenticate("jwt", { session: false }),
  restrictTo("admin"),
  categoryStatus
);

//admin routes // brand
router.post(
  "/addbrand",
  passport.authenticate("jwt", { session: false }),
  restrictTo("admin"),
  addBrand
);
//
router.post(
  "/brandstatus",
  passport.authenticate("jwt", { session: false }),
  restrictTo("admin"),
  brandStatus
);

//admin routes // product
router.post(
  "/addproduct",
  passport.authenticate("jwt", { session: false }),
  restrictTo("admin", "vendor"),
  addProduct
);
//
router.post(
  "/productstatus",
  passport.authenticate("jwt", { session: false }),
  restrictTo("admin", "vendor"),
  productStatus
);
//
router.post(
  "/productupdate",
  passport.authenticate("jwt", { session: false }),
  restrictTo("vendor"),
  updateProduct
);
//
router.post(
  "/productdelete",
  passport.authenticate("jwt", { session: false }),
  restrictTo("vendor"),
  deleteProduct
);

//exporting the admin Routes
module.exports = router;
