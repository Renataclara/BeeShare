'use strict'
const express = require('express'),
      router = express.Router(),
      images = require('../helpers/images')

const Posting = require('../models/Posting')

/* GET main endpoint. */
router.get('/', (req, res, next) => {
  res.send({ message: 'Welcome Buddy!' })
})
router.post('/upload',
  images.multer.single('file'),
  images.sendUploadToGCS,
  (req, res) => {
    // masukin monggose
  Posting.create({
  name: req.body.name,
  imgurl: req.file.cloudStoragePublicUrl,
  description: req.body.description
  // ,userid: req.headers.id
  })
  .then(data => res.send(data))
    res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  })


var userController = require('../controllers/userController');

router.get('/users', userController.findAll);
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.put('/user/:id', userController.update);

router.get('/users', userController.findAll);

router.delete('/users/:id', userController.destroy);

var bookController = require('../controllers/categoryController');
/* GET users listing. */
// router.put('/:id', userController.update);
router.get('/posting', bookController.findAll);
router.get('/posting/:id', bookController.findOne);
router.delete('/posting/:id', bookController.delete);


module.exports = router
