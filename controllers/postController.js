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

const getPostsByKey = async (req, res) => {
  console.log("yeet")
  const key = req.body.key;
  const [rows] = await postData.getPostsByKey(key);
  console.log(rows)
  res.json(rows)
}

const showSearchPage = async (req, res) => {
  console.log("Got here.");
  console.log(req);
  const key = req.body.search_keyword;
  const [searchedPosts] = await postData.getPostsByKey(key);
  console.log(searchedPosts)
  res.render("search", { searchedPosts: searchedPosts, homeCSS: true, postCSS: true});
};

/*
cosnt getPostsByFilter = async (req, res) => {
  const filter = req.params.filter;
  const [rows] = await postData.getPostsByFilter(filter);
  res.json(rows)
}
*/

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
  getPostsByKey,
  getPostByUser,
  replyPostById,
  showSearchPage
};
