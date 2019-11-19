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

const getLatestPost = async (req, res) => {
  const [rows] = await postData.getAll();
  res.json(rows);
};

const getPostById = async (req, res) => {
  // const userInfo = req.session.user;
  const post_id = req.params.id;
  const [post] = await postData.getPostById(post_id);
  const [replies] = await postData.getRepliesByPostId(post_id);
  console.log(replies);
  const postReply = post[0];
  res.render('post', {postReply, replies, homeCSS: true, postCSS: true });

};

const getPostByUser = async (req, res) => {
  const user_id = req.params.id;
  const [rows] = await postData.getPostsByUserId(user_id);
  res.json(rows);
};

const replyPostById = async (req, res) => {
  try {
    // const userInfo = req.session.user;
    // const { user_id } = userInfo;
    const user_id = 1;
    const [rows] = await postData.replyPostById({ ...req.body, user_id });
    if (rows.insertId) {
      res.json({ message: rm.SUCCESS });
    }
  } catch (error) {
    res.render("error", { error: error.stack });
  }
};

module.exports = {
  addPost,
  getAllPost,
  getLatestPost,
  getPostById,
  getPostByUser,
  replyPostById
};
