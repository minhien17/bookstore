const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {type: String, require: true},
    date_time: {type: Date, default: Date.now},
    userid: mongoose.Schema.Types.ObjectId // user binh luan sach 
})

const ReviewSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    slug:{
        type: String, required: true, unique: true
    },
    comments: [commentSchema],
}

)
module.exports = mongoose.model.reviews || mongoose.model('reviews', ReviewSchema);