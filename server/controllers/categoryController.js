'use strict'

const Post = require('../models/Posting')
// var mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
// http://mongoosejs.com/docs/api.html#model-js
module.exports = {

  findAll: function (req,res) {
    Post.find()
    .then(data => res.send(data))
    .catch(err => res.send(err))
  },
  findOne: function (req,res) {
    Post.find({_id: ObjectId(`${req.params.id}`)})
    .then(data => {
      var updateView = {views: data[0].views + 1}
      Post.update({_id: ObjectId(`${req.params.id}`)}, { $set: updateView})
      .then(()=> {
        res.send(data)
      })
    })
    .catch(err => res.send(err))
  },
  delete: function (req,res) {
    Post.deleteOne({_id: ObjectId(`${req.params.id}`)})
    .then(data => res.send(data))
    .catch(err => res.send(err))
  },
  dCounter: function (req, res) {
    Post.find({_id: ObjectId(`${req.params.id}`)})
    .then(data => {
      var downloadData = parseInt(data[0].download) + 1
      Post.update({_id: ObjectId(`${req.params.id}`)}, { $set: {
        download: downloadData
      }})
      .then(()=> {
        res.send('download counter added')
      })
    })
  },

  update: function (req,res) {
    Post.updateOne({_id: ObjectId(`${req.params.id}`)},
        { $set:
          {
            name : req.body.name,
            description: req.body.description
          }
    })
    .then(data => res.send(data))
    .catch(err => res.send(err))
  }
}
