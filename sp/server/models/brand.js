const { model, Schema } = require("mongoose");

const brandSchema = new Schema(
  {
    bname: {
      type: String,
      required: true,
    },
    bimage: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Brand", brandSchema);
