const { Router } = require("express");
const passport = require("passport");

//route instance
const router = Router();

//---------------------------- contact us  controller function -------------------------

const {
  contactUs,

} = require("../controllers/contactUsController");


// contact routes

router.post("/register", contactUs);


//exporting the contact routes
module.exports = router;
