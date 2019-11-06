const userData = require("../models/userData");
const rm = require("../util/responseMsg");

const getAllUser = async (req, res) => {
  try {
    const [rows] = await userData.getAll();
    if (rows.length) {
      res.json(rows[0]);
    } else {
      res.send(rm.NO_USER);
    }
  } catch (error) {
    res.render("error", { error });
  }
};

module.exports = {
  getAllUser
};
