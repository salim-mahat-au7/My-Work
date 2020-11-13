const { Router } = require("express");
const { employeerInfo, employeerInfoConvert } = require("../controllers/employeeController.js");

const router = Router();

router.post("/createEmployee", employeerInfo);
router.get("/convertFile", employeerInfoConvert);

module.exports = router;
