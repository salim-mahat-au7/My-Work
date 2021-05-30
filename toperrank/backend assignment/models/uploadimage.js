const { Schema, model } = require("mongoose");

const uploadimageSchema = new Schema(
  {
    uploadimage:{
      type:String,
    }
  },{timestamps:true}
);

module.exports = model("uploadimage", uploadimageSchema);
