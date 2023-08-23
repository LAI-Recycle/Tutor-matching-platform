const express = require('express')
const router = express.Router()

const tutorController = require('../controllers/tutor-controller') 

const admin = require('./modules/admin') 
router.use('/admin', admin)
router.get('/tutors', tutorController.getTutors) 

router.use('/', (req, res) => res.redirect('/tutors'))

module.exports = router