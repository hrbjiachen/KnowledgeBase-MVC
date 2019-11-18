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
    const [rows] = await Message.getChatHistory({ ...req.body, user_id, receiverId: req.params.id });
    res.json(rows);
}

module.exports = {
    sendMessageById,
    getChatHistoryById
}