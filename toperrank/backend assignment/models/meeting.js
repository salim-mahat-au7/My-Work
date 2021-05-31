const { model, Schema } = require("mongoose");

const meetingSchema = new Schema(
  {
    ID: {
      type: String,
    },
    Title: {
        type: String,
    },
    Participants: {
        type: String,
    },
    StartTime: {
        type: String,
    },
    EndTime: {
        type: String,
    },
    name: {
        type: String,
    required: true,
    },
    email: {
       type: String,
       unique: true,
       required: true,
    },
    rsvp: {
        type: String,
        required: true,
    },

  },
  { timestamps: true }
);

module.exports = model("meeting", meetingSchema);





