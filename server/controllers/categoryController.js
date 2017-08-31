'use strict'

const Book = require('../models/Posting')
// var mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
// http://mongoosejs.com/docs/api.html#model-js
module.exports = {

  findAll: function (req,res) {
    Book.find()
    .then(data => res.send(data))
    .catch(err => res.send(err))
    .populate('userid');
  },
  findOne: function (req,res) {
    Book.find({_id: ObjectId(`${req.params.id}`)})
    .then(data => res.send(data))
    .catch(err => res.send(err))
  },
  delete: function (req,res) {
    Book.deleteOne({_id: ObjectId(`${req.params.id}`)})
    .then(data => res.send(data))
    .catch(err => res.send(err))
  }
  // ,update: function (req,res) {
  //   Book.updateOne({_id: ObjectId(`${req.params.id}`)},
  //       { $set:
  //         {
  //           categoryid : req.body.categoryid,
  //           name: req.body.name,
  //           imgurl: req.body.imgurl
  //         }
  //   })
  //   .then(data => res.send(data))
  //   .catch(err => res.send(err))
  // }
}
