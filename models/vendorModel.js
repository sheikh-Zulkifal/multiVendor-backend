const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    name:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    storeName: {
        type: String,
        required: true,
    },
    productListing:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
    rating:{
        type: Number,
        required: true,
    },
    status:{
        type: String,
        default: 'pending',
    }
},{
    timestamps: true,
})

const Vendor = mongoose.model('Vendor', vendorSchema);
module.exports = Vendor;