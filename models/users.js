const moogoose = require('mongoose')

const userSchema = moogoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    maxlength: 50,
    unique: 1
  },
  password: {
    type: String,
    maxlength: 50,
    minlenth: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0 // 0.admin, 1.user
  },
  tocken: {
    type: String
  },
  tockenExp: {
    type: Number
  }
})

const User = moogoose.model('User', userSchema)

module.exports = { User }