const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {type: String, unique: true, required: true, trim: true},
    username: {type: String, required: false, trim: true, minlength: 2},
    password: {type: String, required: true, trim: true, minlength: 6},
});

module.exports = mongoose.model('User', userSchema);
