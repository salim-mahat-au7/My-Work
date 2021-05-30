const { model, Schema } = require("mongoose");

const ownerSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "owner",
    },
  },
  { timestamps: true }
);

module.exports = model("owner", ownerSchema);
