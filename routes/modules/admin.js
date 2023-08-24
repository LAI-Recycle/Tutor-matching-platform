const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')

router.get('/tutors/create', adminController.createTutor) 
router.get('/tutors', adminController.getTutors)
router.post('/tutors', adminController.postTutor)
router.use('/', (req, res) => res.redirect('/admin/tutors'))
module.exports = router