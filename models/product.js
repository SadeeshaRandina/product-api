const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    prod_id: Number,
    name: String,
    price: Number,
    quantity: Number,
});

module.exports = mongoose.model('Product', productSchema);