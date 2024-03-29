const db = require("../util/database");

const sendMessageToUser = async params => {
  let { subject, user_id, receiverId, message } = params;

  let chatId = await startChatWithUser(user_id, receiverId, subject);

  return await db.query(
    "Insert into message (chat_id, message_content, sender_id) values (?,?,?)",
    [chatId, message, user_id]
  );
};

const startChatWithUser = async (userA, userB, subject) => {
  let [
    response
  ] = await db.execute(
    "Select * from chat where ((user_id_1 = ? and user_id_2 = ?) or (user_id_2 = ? and user_id_1 = ?)) and subject = ?",
    [userA, userB, userA, userB, subject]
  );

  if (response.length) {
    let { chat_id } = response[0];
    return chat_id;
  }

  await db.query(
    "Insert into chat (user_id_1, user_id_2, subject) values (?,?,?)",
    [userA, userB, subject]
  );

  let [
    rows
  ] = await db.execute(
    "Select * from chat where user_id_1 = ? and user_id_2 = ? and subject = ?",
    [userA, userB, subject]
  );
  let { chat_id } = rows[0];

  return chat_id;
};

const getChatHistory = async params => {
  let { user_id: userA, receiverId: userB, subject } = params;

  return await db.execute(
    `Select chat.*, message.*, user.fname, user.lname from chat
     join message on chat.chat_id = message.chat_id 
     join user on message.sender_id = user.user_id
     where ((user_id_1 = ? and user_id_2 = ?) or (user_id_1 = ? and user_id_2 = ?)) and subject = ?
     order by time_sent asc`,
    [userA, userB, userB, userA, subject]
  );
};

const getAllChats = async params => {
  let { user_id } = params;

  return await db.execute(
    `Select * from (Select * from chat join user on 
    (chat.user_id_1 = user.user_id or chat.user_id_2 = user.user_id)
    where chat.user_id_1 = ? or chat.user_id_2 = ?) o where o.user_id != ?`,
    [user_id, user_id, user_id]
  );
};

module.exports = {
  sendMessageToUser,
  getChatHistory,
  getAllChats
};
