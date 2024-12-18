const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    storeName: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
},{
    timestamps: true,
})

export const Vendor = mongoose.model('Vendor', vendorSchema);