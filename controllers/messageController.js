const Message = require("../models/messageData");
const rm = require("../util/responseMsg");

const sendMessageById = async (req, res) => {
    try {
        const userInfo = req.session.user;
        const { user_id } = userInfo;
        const [rows] = await Message.sendMessageToUser({ ...req.body, user_id, receiverId: req.params.id });
        if (rows.insertId) {
            res.json({ message: rm.SUCCESS });
        }
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
        if (rows.length) {
            res.render("messages", { homeCSS: true, rows });
        }
    } catch (error) {
        res.render("error", { error });
    }
}

module.exports = {
    sendMessageById,
    getChatHistoryById,
    showMessagesPage,
    getAllChats
}