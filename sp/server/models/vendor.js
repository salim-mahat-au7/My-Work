const { model, Schema, ObjectId } = require("mongoose");

const vendorSchema = new Schema(
  {
    vname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      required: true,
      minlength: 10,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatar: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      default: "vendor",
    },
    productID: {
      type: ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

module.exports = model("Vendor", vendorSchema);
