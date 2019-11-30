const Message = require("../models/messageData");
const User = require("../models/userData")
const rm = require("../util/responseMsg");
const mailer = require("../util/mailer");

const sendMessageById = async (req, res) => {
    try {
        const userInfo = req.session.user;
        const { user_id } = userInfo;
        const [rows] = await Message.sendMessageToUser({ ...req.body, user_id, receiverId: req.params.id });
        if (rows.insertId) {
            if (req.body.isInitialMessage) sendEmailToUser({...userInfo, ...req.body, receiverId: req.params.id})
            res.json({ message: rm.SUCCESS });
        }
    } catch (error) {
        res.render("error", { error: error.stack });
    }
}

const sendEmailToUser = async (userInfo) => {
    try {
        let { 
            fname,
            lname,
            subject,
            message,
            receiverId
         } = userInfo;
        const [rows] = await User.getUserById(receiverId);
        mailer.sendEmail(`${fname} ${lname}`, rows[0].email, subject, message);
        
    } catch (error) {
        res.render("error", { error: error.stack });
    }
}

const getChatHistoryById = async (req, res) => {
    const userInfo = req.session.user;
    const { user_id } = userInfo;
    const [rows] = await Message.getChatHistory({ subject: req.params.subject, user_id, receiverId: req.params.id });
    res.json(rows);
}

const getAllChats = async (req, res) => {
    const userInfo = req.session.user;
    const { user_id } = userInfo;
    const [rows] = await Message.getAllChats({ ...req.body, user_id });
    res.json(rows);
}

const showMessagesPage = async (req, res) => {
    try {
        let { user_id } = req.session.user;
        const [rows] = await Message.getAllChats({ ...req.body, user_id });
        res.render("messages", { homeCSS: true, messageCSS: true, rows });
    } catch (error) {
        res.render("error", { error });
    }
}

const showInitialMessagesPage = async (req, res) => {
    try {
        const [rows] = await User.getUserById(req.params.id);
        if (rows.length) {
            res.render("sendMessage", { homeCSS: true, messageCSS: true, rows});
        }
    } catch (error) {
        res.render("error", { error });
    }
}

module.exports = {
    sendMessageById,
    getChatHistoryById,
    showMessagesPage,
    getAllChats,
    showInitialMessagesPage
}