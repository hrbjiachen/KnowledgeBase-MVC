const Message = require("../models/messageData");
const User = require("../models/userData");
const rm = require("../util/responseMsg");
const mailer = require("../util/mailer");

const sendMessageById = async (req, res) => {
  try {
    const userInfo = req.session.user;
    const { user_id } = userInfo;
    const [rows] = await Message.sendMessageToUser({
      ...req.body,
      user_id,
      receiverId: req.params.id
    });
    if (rows.insertId) {
      if (req.body.isInitialMessage)
        sendEmailToUser({
          ...userInfo,
          ...req.body,
          receiverId: req.params.id
        });
      res.json({ message: rm.SUCCESS });
    }
  } catch (error) {
    res.render("error", { error: error.stack });
  }
};

const sendEmailToUser = async userInfo => {
  try {
    let { fname, lname, subject, message, receiverId } = userInfo;
    const [rows] = await User.getUserById(receiverId);
    mailer.sendEmail(`${fname} ${lname}`, rows[0].email, subject, message);
  } catch (error) {
    res.render("error", { error: error.stack });
  }
};

const getChatHistoryById = async (req, res) => {
  try {
    const userInfo = req.session.user;
    const { user_id, imgurl } = userInfo;
    const subject = req.params.subject.split("+").join(" ");
    const [rows] = await Message.getChatHistory({
      subject: subject,
      user_id,
      receiverId: req.params.id
    });

    const [receiverInfo] = await User.getUserById(req.params.id);
    let receiver = receiverInfo.length ? receiverInfo[0] : null;
    if (receiver) {
      delete receiver["password"];
    }

    res.json({
      rows,
      avatar: [userInfo, receiver]
    });
  } catch (error) {
    res.render("error", { error });
  }
};

const getAllChats = async (req, res) => {
  const userInfo = req.session.user;
  const { user_id } = userInfo;
  const [rows] = await Message.getAllChats({ ...req.body, user_id });
  res.json(rows);
};

const showMessagesPage = async (req, res) => {
  try {
    let userInfo = req.session.user;
    let { user_id } = userInfo;
    const [rows] = await Message.getAllChats({ ...req.body, user_id });
    rows.forEach((chat, index) => {
      let d = new Date(chat.chat_start_time);
      rows[index].dateString = `${d.toLocaleString("default", {
        month: "short"
      })} ${d.getDay() + 1}`;
    });
    res.render("messages", { homeCSS: true, messageCSS: true, rows, userInfo });
  } catch (error) {
    res.render("error", { error });
  }
};

const showInitialMessagesPage = async (req, res) => {
  try {
    let userInfo = req.session.user;
    const [rows] = await User.getUserById(req.params.id);
    if (rows.length) {
      res.render("sendMessage", {
        homeCSS: true,
        messageCSS: true,
        rows,
        userInfo
      });
    }
  } catch (error) {
    res.render("error", { error });
  }
};

module.exports = {
  sendMessageById,
  getChatHistoryById,
  showMessagesPage,
  getAllChats,
  showInitialMessagesPage
};
