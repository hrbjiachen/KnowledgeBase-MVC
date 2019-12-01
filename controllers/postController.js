const postData = require("../models/postData");
const rm = require("../util/responseMsg");
const postProcessing = require("../util/postProcessing");

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

const getAllMyPosts = async (req, res) => {
  const userInfo = req.session.user;
  const user_id = userInfo.user_id;
  const [allMyPosts] = await postData.getAllMyPosts(user_id);
  postProcessing(allMyPosts);
  res.render('myPosts', {userInfo, allMyPosts, homeCSS: true, postCSS: true });
};

const getLatestPost = async (req, res) => {
  const [rows] = await postData.getLatest();
  res.json(rows);
};

const getPostById = async (req, res) => {
  const post_id = req.params.id;
  const [row] = await postData.getPostById(post_id);
  const [replies] = await postData.getRepliesByPostId(post_id);
  const post = row[0];
  res.render('post', {post, replies, homeCSS: true, postCSS: true });

};

const getPostByUser = async (req, res) => {
  const user_id = req.params.id;
  const [rows] = await postData.getPostsByUserId(user_id);
  res.json(rows);
};

const showSearchPage = async (req, res) => {
  const key = req.body.search_keyword;
  const [searchedPosts] = await postData.getPostsByKey(key);
  res.render("search", { searchedPosts: searchedPosts, homeCSS: true, postCSS: true});
};

const getPostsByFilter = async (req, res) => {
  const key = req.body.search_keyword;
  const [searchedPosts] = await postData.getPostsByFilter(key);
  res.render("search", { searchedPosts: searchedPosts, homeCSS: true, postCSS: true});
}

const replyPostById = async (req, res) => {
  try {
    const userInfo = req.session.user;
    const user_id = userInfo.user_id;
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
  getAllMyPosts,
  getLatestPost,
  getPostById,
  getPostByUser,
  replyPostById,
  showSearchPage,
  getPostsByFilter
};
