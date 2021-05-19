const mongoose = require('mongoose');



/**
 * Schema for the user model.
 */

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


const User = mongoose.model("UserData", UserSchema);
module.exports = User;