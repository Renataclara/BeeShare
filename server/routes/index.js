'use strict'
const express = require('express'),
      router = express.Router(),
      images = require('../helpers/images'),
      auth  = require('../helpers/auth')
const Posting = require('../models/Posting')

/* GET main endpoint. */
router.get('/', (req, res, next) => {
  res.send({ message: 'Welcome Buddy!' })
})
// auth.checkLogin
router.post('/upload', 
  images.multer.single('file'),
  images.sendUploadToGCS,
  (req, res) => {
    // masukin monggose
  var ext = req.file.cloudStoragePublicUrl.toString().split('.')
  Posting.create({
  name: req.body.name,
  imgurl: req.file.cloudStoragePublicUrl,
  description: req.body.description,
  type: ext[ext.length-1],
  userid: req.headers.id
  })
  .then(data => res.send(data))
})

var userController = require('../controllers/userController');

router.get('/users', userController.findAll);
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.put('/user/:id',auth.checkLogin, userController.update);
router.get('/users', userController.findAll);
router.delete('/users/:id', userController.destroy);

var postController = require('../controllers/categoryController');
/* GET users listing. */
router.put('/posting/:id', postController.update);
router.get('/posting', postController.findAll);
router.post('/posting/:id', postController.dCounter);
router.get('/posting/:id', postController.findOne);
router.delete('/posting/:id', postController.delete);
router.get('/posting/user/:id', postController.findByUserId);


module.exports = router
