const fs = require("fs");
const json2xls = require("json2xls");
const Employee = require("../model/employee");

module.exports = {
  async employeerInfo(req, res) {
    try {
      const employeeData = req.body;
      if (employeeData) {
        await Employee.create({ ...employeeData });
        res.json({ message: "Employee Creted Sucessfully" }).status(200);
      } else {
        res.json({ message: "No Data" }).status(400);
      }
    } catch (err) {
      res.json({ message: "Error in Creating Employee" }).status(400);
    }
  },

  async employeerInfoConvert(req, res) {
    try {
      const filename = "newdata.xls";
      const employeeData = await Employee.find().select([
        "name",
        "email",
        "company",
        "contact",
        "post",
      ]);

      const allEmployee = [];

      await employeeData.map((data) => {
        allEmployee.push(data._doc);
      });

      const xls = json2xls(allEmployee);
      fs.writeFileSync(filename, xls, "binary", (err) => {
        if (err) {
          console.log("writeFileSync :", err);
        }
      });
      res.json({ message: `File Converted ${filename}` });
    } catch (err) {
      res.json({ message: "Error in Converting the into Excel" }).status(400);
    }
  },
};
