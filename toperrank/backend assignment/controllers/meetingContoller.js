//Model
const Meeting = require("../models/meeting");



//genrating the TransactionId function
function generatemeetingID(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 10; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


module.exports = {

    SheduleMeeting: async (req, res, next) => {
        try {
        
          //given data
          const { ID, Title, Participants, StartTime,  EndTime, name, email, rsvp} = req.body;

          const meetingID = generatemeetingID()

          //user data
          const meetingData = await Meeting.findOne({ email });

          // if not user data
          if (meetingData) {
              return res.status(404).json({status:404, error:"Meeting already exist with this email"});
          }
          
          //meeting data
          const newMeeting = await new Meeting({
            ID: meetingID,
            Title,
            Participants, 
            StartTime,  
            EndTime,
            name,
            email,
            rsvp
          });
          
          //save data
          await newMeeting.save();   
          //success message
          res.status(200).json({
            status:200,
            message:
              "Meeting Sheduled Successfully",
          });
        } catch (err) {
          console.log("Error in shedule meeting", err.message);
          return res
            .status(400)
            .json({ message: `Error in shedule meeting ${err.message}` });
        }
      },

// get meeting using id
GetMeeting: async (req, res, next) => {
  try {
    const { ID } = req.params
    // find given id
    const meetingData = await Meeting.findOne({ ID })
    // if id not found
    if (!meetingData) {
      return res.status(404).json({ status: 404, message: "ID not found" });
    }

    //success message
    res.status(200).json({ status: 200, message: meetingData })

  } catch (err) {
    console.log("Error in getting meeting by id");
    return res
      .status(400)
      .json({ status: 400, error: `Error in getting meeting by id ${err.error}` })

  }
},


// get meeting in time frame
GetMeetingStartTime: async (req, res, next) => {
  try {
    const { StartTime } = req.params
    // find given id
    const meetingData = await Meeting.find({ StartTime  })
    // if id not found
    if (!meetingData) {
      return res.status(404).json({ status: 404, message: "Start time not found" });
    }

    //success message
    res.status(200).json({ status: 200, message: meetingData })

  } catch (err) {
    console.log("Error in getting meeting by start time");
    return res
      .status(400)
      .json({ status: 400, error: `Error in getting meeting by start time ${err.error}` })

  }
},


GetMeetingEndTime: async (req, res, next) => {
  try {
    const { EndTime } = req.params
    // find given id
    const meetingData = await Meeting.find({ EndTime })
    // if id not found
    if (!meetingData) {
      return res.status(404).json({ status: 404, message: "End time not found" });
    }

    //success message
    res.status(200).json({ status: 200, message: meetingData })

  } catch (err) {
    console.log("Error in getting meeting by end time");
    return res
      .status(400)
      .json({ status: 400, error: `Error in getting meeting by end time ${err.error}` })

  }
},
 
}
//----------------------------------------------------------------------------------------------
