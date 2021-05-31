const { Router } = require("express");


//route instance
const router = Router();



//-----------------------meeting Controller function ---------  ----------------

const { SheduleMeeting, GetMeeting, GetMeetingStartTime, GetMeetingEndTime  } = require("../controllers/meetingContoller");



//-----------------------------  meeting routes --------------------------
//shedule meeting
router.post("/meeting", SheduleMeeting);


//get meeting
router.get("/meeting/:ID", GetMeeting);


//get meeting
router.get("/meeting/:StartTime", GetMeetingStartTime);

//get meeting
router.get("/meeting/:EndTime", GetMeetingEndTime );


module.exports = router;
