const mongoose = require('mongoose');

const retailerSchema = mongoose.Schema({
    retailername: {
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
    }
});

const Retailer = mongoose.model('Retailer', retailerSchema);

module.exports = Retailer;