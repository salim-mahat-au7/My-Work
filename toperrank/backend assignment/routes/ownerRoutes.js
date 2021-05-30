const { Router } = require("express");

const passport = require("passport");

//to protect the route
const { restrictTo } = require("../middleware/protect");

//route instance
const router = Router();



//-----------------------owner auth Controller function ---------  ----------------

const { ownerLogin } = require("../controllers/ownerAuthController");


// --------------------- uploadImage controller function-------------------------------
const {
    UploadImage
} = require("../controllers/uploadimageController");





//-----------------------------  owner routes --------------------------
// owner login
router.post("/ownerlogin", ownerLogin);

//-----------------uploadimage routes------------------------------------
router.post("/uploadImage", passport.authenticate("jwt", { session: false }), restrictTo("owner"), UploadImage);


// restrictTo("superadmin"),


module.exports = router;
