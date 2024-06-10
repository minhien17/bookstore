const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String, required: true
    },
    slug: {
        type: String, required: true, unique: true
    },
    price: {
        type: Number, required: true
    },
    src: {
        type: String, required: true
    },
    quantity:{
        type: Number, required: true
    },
    rate: {
        type: Number, required: true, default: 5,
    }

})

module.exports = mongoose.model.products || mongoose.model('products', ProductSchema);