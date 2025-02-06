const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    messageText: {
        type: String,
        required: true,
    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status:{
        type: String,
        default: "pending",
    },
    messageTime:{
        type: Date,
        default: Date.now,
    }
    
},{
    timestamps: true,
});
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;