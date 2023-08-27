const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')
const upload = require('../../middleware/multer') 

router.get('/tutors/create', adminController.createTutor) 
router.get('/tutors/:id/edit', adminController.editTutor)
router.get('/tutors/:id', adminController.getTutor) 
router.put('/tutors/:id', upload.single('image'), adminController.putTutor)
router.delete('/tutors/:id', adminController.deleteTutor)
router.get('/tutors', adminController.getTutors)
router.post('/tutors', upload.single('image'), adminController.postTutor)
router.use('/', (req, res) => res.redirect('/admin/tutors'))
module.exports = router