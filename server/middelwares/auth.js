const { User } = require('../models/users')

let auth = (req, res, next) => {
  let auth = req.cookies.abc_auth

  User.findbyToken(token, (err, user) => {
    if (err) throw err
    if (!user) return res.json({
      isAuth: false,
      error: true
    })
    req.token = token
    req.user = user
    next()
  })
}

module.exports = { auth }