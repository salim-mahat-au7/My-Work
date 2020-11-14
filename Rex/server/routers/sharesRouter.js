const { Router } = require("express");

const { addShareData, ShareDataInfo } = require("../controllers/sharesController");

const router = Router();

router.post("/createShares", addShareData);

router.get("/getShares", ShareDataInfo);

module.exports = router;
