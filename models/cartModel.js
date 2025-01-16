const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cartItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    total: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        default: "pending"
    },
    payment:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        required: true
    },

},{timestampes: true});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
