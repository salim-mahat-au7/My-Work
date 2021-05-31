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
 
}
//----------------------------------------------------------------------------------------------
