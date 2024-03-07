const mongoose = require('mongoose');

const retailerSchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    token: {
        type: String
    }
});

const Retailer = mongoose.model('Retailer', retailerSchema);

module.exports = Retailer;