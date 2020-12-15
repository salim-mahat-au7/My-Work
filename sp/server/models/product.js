const { model, Schema, ObjectId } = require("mongoose");

const productSchema = new Schema(
  {
    proId: {
      type: Number,
      required: true,
    },
    vname: {
      type: String,
      required: true,
    },
    pname: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: "admin",
    },
    pimage: {
      type: String,
      required: true,
    },
    bname: {
      type: String,
      required: true,
    },
    cname: {
      type: String,
      required: true,
    },
    brandID: {
      type: ObjectId,
      ref: "Brand",
    },
    categoryID: {
      type: ObjectId,
      ref: "Category",
    },
    vendorID: {
      type: ObjectId,
      ref: "Vendor",
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);
