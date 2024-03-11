const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    retailerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Retailer',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    availability: {
        type: String,
        enum: ['inStock', 'outOfStock', 'limited'],
        default: 'instock'
    },
    photo: {
        type: String
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;