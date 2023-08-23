const bcrypt = require('bcryptjs') 
const db = require('../models')
const { User } = db
const userController = {
  signUpPage: (req, res) => {
    res.render('signup')
  },
  signUp: (req, res) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
      }))
      .then(() => {
        res.redirect('/signin')
      })
  },
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: (req, res) => {
    // req.flash('success_messages', '成功登入！')
    res.redirect('/teachers')
  },
  logout: (req, res) => {
    // req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('/signin')
  }
}
module.exports = userController