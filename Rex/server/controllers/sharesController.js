const Shares = require("../model/shares");

module.exports = {
  async addShareData(req, res) {
    try {
      const sharesDetail = req.body;
      await Shares.create({ ...sharesDetail });
      return res .json({ message: "Shares information added Sucessfully",}).status(200);
    } catch (err) {
      console.log("Error:", err);
    }
  },

  async ShareDataInfo(req, res) {
    try {
      const sharesDetail = await Shares.find();
      return res.json({ sharesDetail }) .status(200);
    } catch (err) {
      console.log("Error:", err);
    }
  },
};
