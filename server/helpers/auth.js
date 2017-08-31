const jwt = require('jsonwebtoken')
require('dotenv').config()

const checkLogin = (req,res,next) => {
  if(req.headers.token == undefined) {
    res.send('not authorize')
  } else {
    jwt.verify(req.headers.token, 'renata', (err,decoded) => {
      if(err) {res.send(err)}
      else {
        console.log('ini decoded >>', decoded);
        // req.decoded = decoded
        if(decoded) {
          next()
        } else {res.send('ditolak gan')}
      }
    }) //token = Authorization
  }
}

// const checkAdmin = (req,res,next) => {
//   jwt.verify(req.headers.token, 'renata', (err,decoded) => {
//     if(err) {res.send(err)}
//     else {
//       if(decoded.isAdmin){
//         next()
//
//       } else {
//         if(req.params.id == decoded.id) {
//           next()
//         } else {res.send('ditolak gan')}
//         // res.status(401).send('You are not auth')
//       }
//     }
//   }) //token = Authorization
// }


module.exports = {
  checkLogin
  // checkAdmin
}
