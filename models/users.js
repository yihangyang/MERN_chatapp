const moogoose = require('mongoose')
const bcrypt = require('bcrypt')


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

// before saving from password, need to crypt.
const saltRounds = 10
userSchema.pre('save', function(next){
  var user = this
  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) return next(err) // if we not have access on below, just go to save
      bcrypt.hash(user.password, salt, function(err, hash){
        if (err) return next(err) // if we not have access on below, just go to save
        user.password = hash
      })
    })
  } else {
    next()
  }
})

const User = moogoose.model('User', userSchema)

module.exports = { User }