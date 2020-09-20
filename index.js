const { mongodb_name, mongodb_pass } = require("./private/access");
const { request, response } = require("express");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const { User } = require('./models/users');
const { mongoURI } = require("./config/key");
const { auth } = require("./middelwares/auth");

const app = express()

// mongo database
mongoose.connect(mongoURI ,{
  useNewUrlParser: true // remove duplication errors from mongo
}).then(() => {
  console.log("MongoDB connected")
}).catch(err => {
  console.error(err)
})

// middleware cookieparse
app.use(bodyParser.urlencoded({ extended: true })) // no duplication waning
app.use(bodyParser.json())
app.use(cookieParser())

app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role
  })
})
app.post('/api/users/register', (req, res) => {
  const user = new User(req.body)
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true,
      userData: doc
    })
  })
})

app.post('/api/users/login', (req, res) => {
  // find the email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user){ 
      return response.json({
        loginSuccess: false,
        message: 'Auth failed due to unvailded email'
      })}
      // compare the password
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({ loginSuccess: false, message: 'password false' })
        }
      })
      // generate token
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err)
        res.cookie("abc_auth", user.token)
          .status(200)
          .json({
            loginSuccess: true,
          })
      })
    
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "" },
    (err, doc) => {
      if(err) return res.json({ success: false, err })
      return res.status(200).send({
        success: true
      })
    }
  )
})

app.listen(5000)