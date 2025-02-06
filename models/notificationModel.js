const mongoose =  require("mongoose");

const notificationSchema = new mongoose.Schema({
    message:{
        type: String,
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
    notificationTime:{
        type: Date,
        default: Date.now,
    }   
},{
    timestamps: true,
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;