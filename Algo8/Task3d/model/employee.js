const { Schema, model } = require("mongoose");

const employeeSchema = Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  company: {
    type: String,
  },
  contact: {
    type: String,
  },
  post: {
    type: String,
  },
});
const EMPLOYEE = model("employee", employeeSchema);

module.exports = EMPLOYEE;
