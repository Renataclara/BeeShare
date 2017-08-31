'use strict'

const User = require('../models/User')
// var mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
var jwt = require('jsonwebtoken');
const generate = require('../helpers/generateSecret');
const hash = require('../helpers/hash');
const crypto = require('crypto');


module.exports = {
  findAll: function (req,res) {
          User.find()
          .then(function (data) {
            res.send(data);
          })
  },
  signup: function (req,res) {
    const key = generate()
    const pass = hash(req.body.password, key)
    User.create({
      name: req.body.name,
      username: req.body.username,
      password: pass,
      key: key
    })
    .then(function(result) {
      res.send(result);
    })
    .catch(function(err) {
      res.send(err);
    })
  },
  signin: function (req,res) {
    // console.log(req.body);
    User.findOne({
        username:req.body.username
    })
    .then(function(row) {
      console.log(row);
      const key = row.key
      const pass = hash(req.body.password, key);

      if(row.password == pass) {
        console.log(row.password, 'ini password');
        console.log(pass, 'ini pass');
      const token =  jwt.sign({
          id: row._id,
          name: row.name,
          username: row.username
        }, 'renata', function(err, token) {
          // if (err) {res.send(err)}
          // req.headers.token = token
          console.log('lol da di sini', err, token);
          res.send({token: token, id: row._id, name:row.name, username:row.username});
        });
      } else {res.send('wrong password')}
    })
    .catch(function(err){
      // res.send('user not found')
    })
  },
  destroy: function (req,res) {
        User.deleteOne({_id:req.params.id})
        .then(function () {
          res.send('user is destroyed');
        })
  },
  update: function (req,res) {
          User.where({
            _id: req.params.id
          })
          .update({
            name: req.body.name
          })
          .then(function (data) {
            res.send(data);
          })
  }
}
