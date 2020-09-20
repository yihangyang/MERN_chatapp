const moogoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


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
  token: {
    type: String
  },
  tokenExp: {
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
        next()
      })
    })
  } else {
    next()
  }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if (err) return cb(err)
    return cb(null, isMatch)
  })
}

userSchema.methods.generateToken = function(cb) {
  var user = this
  var token = jwt.sign(user._id.toHexString(), 'secret')

  user.token = token;
  user.save(function(err, user) {
    if (err) return cb(err)
    cb(null, user)
  })
}

userSchema.statics.findByToken = function(token, cb) {
  var user = this
  jwt.verify(token, 'secret', function (err, decode){
    user.findOne({"_id": decode, "token": token}, function (err, user) {
      if(err) return cb(err)
      cb(null, user)
    })
  })
}

const User = moogoose.model('User', userSchema)

module.exports = { User }