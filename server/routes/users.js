const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middlewares/auth");


router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  })
})

router.post('/register', (req, res) => {
  const user = new User(req.body)
  user.save((err, doc) => {
    if (err) return res.json({ registerSuccess: false, err })
    return res.status(200).json({
      registerSuccess: true,
      userData: doc
    })
  })
})

router.post('/login', (req, res) => {
  // find the email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user){ 
      return res.json({
        loginSuccess: false,
        message: 'Auth failed due to unvailded email'
      })
    }
    // compare the password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.json({ loginSuccess: false, message: 'password false' })
      // generate token
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err)
        res.cookie("abc_authExp", user.tokenExp);
        res.cookie("abc_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})

router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if(err) return res.json({ success: false, err })
      return res.status(200).send({
        success: true
      })
    }
  )
})

module.exports = router;