'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema
//http://mongoosejs.com/docs/populate.html
var UserSchema = new Schema({
    name: {
    type: String,
    required: false
    },
    username: {
    type: String,
    required: true
    },
    password: {
    type: String,
    required: true
    },
    key: {
    type: String,
    required: false
    }
});

//create model
var User = mongoose.model('User', UserSchema);

module.exports = User;
