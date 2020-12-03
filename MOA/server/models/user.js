const { model, Schema} = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      locality: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
      coordinatesType: {
        type: String,
        required: true,
      },
      coordinates:{
        type:[Number],
        required:true
       },
      createdAt: {
        type: Date,
        default: Date.now()
      },
    },
  },
);

module.exports = model("User", userSchema);
