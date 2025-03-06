const mongoose = require('mongoose')

const supportAccount = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status:{
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",


    },
    category: {
        type: String,
        enum: ["user issues", "vendor issues"],
        required: true,
    },

},{
    timestamps: true,
});
 
const SupportAccount = mongoose.model("SupportAccount", supportAccount);
module.exports = SupportAccount;