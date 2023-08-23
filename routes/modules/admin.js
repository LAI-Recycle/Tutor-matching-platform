const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')
router.get('/tutors', adminController.getTutors)
router.use('/', (req, res) => res.redirect('/admin/tutors'))
module.exports = router