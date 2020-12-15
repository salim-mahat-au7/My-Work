const { model, Schema } = require("mongoose");

const categorySchema = new Schema(
  {
    cname: {
      type: String,
      required: true,
    },
    cimage: {
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

module.exports = model("Category", categorySchema);
