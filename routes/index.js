const express = require('express')
const router = express.Router()
const admin = require('./modules/admin') 
const tutorController = require('../controllers/tutor-controller') 
const userController = require('../controllers/user-controller')
const commentController = require('../controllers/comment-controller')
const { authenticated, authenticatedAdmin } = require('../middleware/auth')
const { generalErrorHandler } = require('../middleware/error-handler')
const passport = require('../config/passport') 
const upload = require('../middleware/multer')

router.use('/admin', authenticatedAdmin, admin)
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn) // Passport 做身分驗證
router.get('/logout', userController.logout)
router.get('/tutors/:id', authenticated, tutorController.getTutor)
router.get('/tutors', authenticated, tutorController.getTutors) 
router.delete('/comments/:id', authenticatedAdmin, commentController.deleteComment)
router.post('/comments', authenticated, commentController.postComment)
router.get('/users/:id/edit', authenticated, userController.editUser)
router.get('/users/:id', authenticated, userController.getUser)
router.put('/users/:id', authenticated, upload.single('image'), userController.putUser)

router.use('/', (req, res) => res.redirect('/tutors'))
router.use('/', generalErrorHandler)

module.exports = router