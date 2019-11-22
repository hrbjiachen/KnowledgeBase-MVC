const postData = require("../models/postData");
const rm = require("../util/responseMsg");

const addPost = async (req, res) => {
  try {
    const userInfo = req.session.user;
    const { user_id } = userInfo;
    const [rows] = await postData.add({ ...req.body, user_id });
    if (rows.insertId) {
      res.json({ message: rm.SUCCESS });
    }
  } catch (error) {
    res.render("error", { error: error.stack });
  }
};

const getAllPost = async (req, res) => {
  const [rows] = await postData.getAll();
  res.json(rows);
};

const getPostById = async (req, res) => {
  const post_id = req.params.id;
  const [rows] = await postData.getPostById(post_id);
  res.json(rows);
};

const getPostByUser = async (req, res) => {
  const user_id = req.params.id;
  const [rows] = await postData.getPostsByUserId(user_id);
  res.json(rows);
};

const getPostsByKey = async (req, res) => {
  const key = req.body.key;
  const [rows] = await postData.getPostsByKey(key);
  console.log(rows)
  res.json(rows)
}

/*
cosnt getPostsByFilter = async (req, res) => {
  const filter = req.params.filter;
  const [rows] = await postData.getPostsByFilter(filter);
  res.json(rows)
}
*/

module.exports = {
  addPost,
  getAllPost,
  getPostById,
  getPostByUser,
  getPostsByKey
};
