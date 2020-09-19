const { mongodb_name, mongodb_pass } = require("./private/access");
const { request } = require("express");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const { User } = require('./models/users')

const app = express()

// mongo database
mongoose.connect(`mongodb+srv://${mongodb_name}:${mongodb_pass}@cluster0.utsnh.mongodb.net/<dbname>?retryWrites=true&w=majority`,{
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

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body)
  user.save((err, userData) => {
    if (err) return res.json({ success: false, err })
  })
  return res.status(200).json({
    success: true
  })
})

app.listen(5000)