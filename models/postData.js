const db = require("../util/database");

const add = async data => {
  const { subject, detail, topic, user_id } = data;

  return await db.query(
    "Insert into post (user_id, subject, detail, topic) values (?,?,?,?)",
    [user_id, subject, detail, topic]
  );
};

const getAll = async () => await db.execute("Select * from post");

const getLatest = async () => 
  await db.execute("SELECT COUNT(reply.reply_id) AS replies_count,DATE_FORMAT(post.date_created,'%b,%d %Y') AS date_formated,post.*,user.fname,user.lname,user.imgurl " + 
  "FROM post INNER JOIN user ON post.user_id = user.user_id LEFT JOIN reply ON reply.post_id = post.post_id GROUP BY post.post_id ORDER BY `date_created` DESC LIMIT 2");


const getPostById = async id =>
  await db.execute("SELECT post.*,user.fname,user.lname,user.imgurl,DATE_FORMAT(post.date_created,'%b,%d %Y') AS date_formated " +
    "FROM post,user WHERE post_id = ?", [id]);

const getPostsByUserId = async user_id =>
  await db.execute("Select * from post where user_id = ?", [user_id]);

const getPostsByKey = async key =>
  await db.execute("select post.*,DATE_FORMAT(post.date_created,'%b,%d %Y') AS date_formated, user.fname, user.lname, user.imgurl from" +
    " user inner join post on user.user_id = post.user_id" +
    " where post.detail like ? or post.subject like ?", ['%' + key + '%', '%' + key + '%']);

const getPostsByFilter = async key =>
  await db.execute("select post.*,DATE_FORMAT(post.date_created,'%b,%d %Y') AS date_formated, user.fname, user.lname, user.imgurl from" +
    " user inner join post on user.user_id = post.user_id" +
    " where post.topic = ?", [key]);

const replyPostById = async data => {
    const { post_id, detail, user_id } = data;
    return await db.query("Insert into reply (user_id, post_id, detail) values(?,?,?)", [user_id, post_id, detail]);
  };

const getRepliesByPostId = async post_id =>
  await db.execute("SELECT reply.*,user.imgurl FROM reply,user WHERE reply.user_id = user.user_id AND reply.post_id = ? ORDER BY `date_created`", [post_id]);


module.exports = {
  add,
  getAll,
  getLatest,
  getPostById,
  getPostsByKey,
  getPostsByFilter,
  getPostsByUserId,
  replyPostById,
  getRepliesByPostId
};
