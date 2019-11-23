const db = require("../util/database");

const add = async data => {
  const { subject, detail, topic, user_id } = data;

  return await db.query(
    "Insert into post (user_id, subject, detail, topic) values (?,?,?,?)",
    [user_id, subject, detail, topic]
  );
};

const getAll = async () => await db.execute("Select * from post");

const getLatest = async () => {

  const rows = await db.execute("SELECT post.*,user.fname,user.lname,user.imgurl FROM post,user WHERE post.user_id = user.user_id ORDER BY `date_created` DESC LIMIT 2");
  // var t = "2019-11-19T20:30:22.000Z".split(/[-T :]/);
  // var d = new Date(Date.UTC(t[0], t[1]-1, t[2]));
  // rows[0].forEach(element => {
  //   console.log(element);
  // });
  return rows;
}
const getPostById = async id =>
  await db.execute("SELECT post.*,user.fname,user.lname,user.imgurl FROM post,user WHERE post_id = ?", [id]);

const getPostsByUserId = async user_id =>
  await db.execute("Select * from post where user_id = ?", [user_id]);

const getPostsByKey = async key =>
  await db.execute("select post.*, user.fname, user.lname, user.imgurl from" +
    " user inner join post on user.user_id = post.user_id" +
    " where post.detail like ? or post.subject like ?", ['%' + key + '%', '%' + key + '%']);

const getPostsByFilter = async key =>
  await db.execute("Select * from post where subject like ?", ['%' + key + '%'])

const replyPostById = async data => {
    const { post_id, detail, user_id } = data;
    const sql = "Insert into reply (user_id, post_id, detail) values ('"+user_id+"','"+post_id+"','"+detail+"')";
    return await db.query(sql);
  };

const getRepliesByPostId = async post_id =>{
  const rows = await db.execute("SELECT reply.*,user.imgurl FROM reply,user WHERE reply.user_id = user.user_id ORDER BY `date_created`");
  // await db.execute("Select * from reply where post_id = ?", [post_id]);
  return rows;
}


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
