const { Router } = require("express");
const passport = require("passport");


//route instance
const router = Router();

//---------------------------- user auth controller function -------------------------

const {
  userRegister,
  userConfirmation,
  userLogin,
  verifyResendToken,
  forgotPassword,
  postOTP,

} = require("../controllers/userAuthController");

//---------------------------- user controller function ----------------------------

const { userDelete, generateRefreshToken } = require("../controllers/userController");


// user routes

router.post("/register", userRegister);

router.get("/userConfirmation/:token", userConfirmation);

router.post("/login", userLogin);

router.post("/resendToken", verifyResendToken);

router.post("/forgotPassword", forgotPassword);

router.post("/postOTP", postOTP);


router.post(
  "/userDelete",
  passport.authenticate("jwt", { session: false }),
  userDelete
);

router.post(
  "/refreshToken",
  generateRefreshToken
);

//exporting the user routes
module.exports = router;
