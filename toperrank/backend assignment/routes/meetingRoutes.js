const { Router } = require("express");


//route instance
const router = Router();



//-----------------------meeting Controller function ---------  ----------------

const { SheduleMeeting } = require("../controllers/meetingContoller");



//-----------------------------  meeting routes --------------------------
//shedule meeting
router.post("/meetings", SheduleMeeting);


module.exports = router;
