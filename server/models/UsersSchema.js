const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    googleId : String,
    displayName : String,
    email : String,
    image : String,
},{timestamps:true});

const UsersCollection = mongoose.model('users', UserSchema);

module.exports = UsersCollection;