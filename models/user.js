const mongoose = require('mongoose');
var passportLocalMongoose=require("passport-local-mongoose");

const UserForm = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
        require: true,
    }
});

UserForm.plugin(passportLocalMongoose);

const Users = mongoose.model('Users', UserForm);

module.exports = Users;