const { Router } = require("express");

const router = Router();

//-----------------------vendor Controller function ---------  ----------------

const { vendorRegister } = require("../controllers/vendorController");

//------------------------------------------------------------------------------

//vendor routes
router.post("/addvendor", vendorRegister);

//exporting the admin Routes
module.exports = router;
