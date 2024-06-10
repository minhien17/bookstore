const mongoose = require('mongoose')
const packageSchema = new mongoose.Schema({
    userid: {type: mongoose.Schema.Types.ObjectId, unique: true},
    slug: {type: String, require: true},
    quantity: {type: Number, require: true},
})
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String, required: true, unique: true
        },
        password: {
            type: String, required: true
        },
        first_name: {
            type: String, required: true
        },
        last_name: {
            type: String, required: true
        },
        email: {
            type: String
        },
        address: {
            type: String, required: true
        },
        package: [packageSchema]
    }
)
module.exports = mongoose.model.users || mongoose.model('users', UserSchema, 'users');