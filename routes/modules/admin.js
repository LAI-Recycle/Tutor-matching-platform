const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')
const { authenticatedAdmin } = require('../../middleware/auth')

router.get('/tutors', authenticatedAdmin, adminController.getTutors)
router.use('/', (req, res) => res.redirect('/admin/tutors'))
module.exports = router