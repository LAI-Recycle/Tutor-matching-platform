const express = require('express')
const router = express.Router()
const admin = require('./modules/admin') 
const tutorController = require('../controllers/tutor-controller') 
const userController = require('../controllers/user-controller')
const { generalErrorHandler } = require('../middleware/error-handler')
const passport = require('../config/passport') 

router.use('/admin', admin)
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn) // Passport 做身分驗證
router.get('/tutors', tutorController.getTutors) 

router.use('/', (req, res) => res.redirect('/tutors'))
router.use('/', generalErrorHandler)

module.exports = router