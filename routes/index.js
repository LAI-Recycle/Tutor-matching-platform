const express = require('express')
const router = express.Router()

const teachController = require('../controllers/teacher-controller') 

router.get('/teachers', teachController.getTeachers) 

router.use('/', (req, res) => res.redirect('/teachers'))

module.exports = router