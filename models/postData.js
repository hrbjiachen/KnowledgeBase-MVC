const db = require("../util/database");

const add = async data => {
  const { subject, detail, topic, user_id } = data;

  return await db.query(
    "Insert into post (user_id, subject, detail, topic) values (?,?,?,?)",
    [user_id, subject, detail, topic]
  );
};

const getAll = async () => await db.execute("Select * from post");

const getPostById = async id =>
  await db.execute("Select * from post where post_id = ?", [id]);

const getPostsByUserId = async user_id =>
  await db.execute("Select * from post where user_id = ?", [user_id]);

const getPostsByKey = async key =>
  await db.execute("Select * from knowledgebase.post where detail like ? or subject like ?", ['%' + key + '%', '%' + key + '%']);

const getPostsByFilter = async key =>
  await db.execute("Select * from post where subject like %?%", [key])

module.exports = {
  add,
  getAll,
  getPostById,
  getPostsByUserId,
  getPostsByKey,
  getPostsByFilter
};
