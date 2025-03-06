const Message = require("../models/messageModel");

exports.getMessages = async (req, res) => {
  try {
    const { sender, receiver } = req.body;
    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ createdAt: 1 });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.log("Error getting messages", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.sendMessage = async (req, res) => {
    try {
        const { sender, receiver, messageText } = req.body;
        const message = new Message({ sender, receiver, messageText });
        await message.save();
        res.status(201).json({ success: true, message });
    } catch (error) {
        console.log("Error sending message", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
