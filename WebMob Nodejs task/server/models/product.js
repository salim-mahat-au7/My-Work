const { model, Schema} = require("mongoose");

const productSchema = new Schema(
  {
    proId: {
      type: Number,
      required: true,
    },
    sku:{
      type: String,
      required: true,
      unique:true,
    },
    pname: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    pimage: {
      type: String,
      required: true,
    },
  },
);

module.exports = model("Product", productSchema);
