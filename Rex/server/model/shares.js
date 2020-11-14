const { Schema, model } = require("mongoose");

const sharesSchema = Schema({
  scrip: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  avgcost: {
    type: Number,
  },
  investamt: {
    type: Number,
  },
  portvalue: {
    type: Number,
  },
  unrealizedpl: {
    type: Number,
  },
  returnvalue: {
    type: Number,
  },
});

const SHARE = model("shares", sharesSchema);

module.exports = SHARE;
