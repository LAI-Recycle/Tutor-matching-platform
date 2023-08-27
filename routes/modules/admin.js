const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')
const categoryController = require('../../controllers/category-controller')
const upload = require('../../middleware/multer') 

router.patch('/users/:id', adminController.patchUser)
router.get('/users', adminController.getUsers)
router.get('/tutors/create', adminController.createTutor) 
router.get('/tutors/:id/edit', adminController.editTutor)
router.get('/tutors/:id', adminController.getTutor) 
router.put('/tutors/:id', upload.single('image'), adminController.putTutor)
router.delete('/tutors/:id', adminController.deleteTutor)
router.get('/tutors', adminController.getTutors)
router.post('/tutors', upload.single('image'), adminController.postTutor)
router.get('/categories/:id', categoryController.getCategories) 
router.put('/categories/:id', categoryController.putCategory)
router.delete('/categories/:id', categoryController.deleteCategory)
router.get('/categories', categoryController.getCategories)
router.post('/categories', categoryController.postCategory)
router.use('/', (req, res) => res.redirect('/admin/tutors'))
module.exports = router