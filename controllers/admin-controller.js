const { Tutor, User, Category } = require('../models')
const { localFileHandler } = require('../helpers/file-helpers')

const adminController = {
  getTutors: (req, res, next) => {
    Tutor.findAll({
      raw: true,
      nest: true,
      include: [Category] 
    })
    .then(tutors => 
      res.render('admin/tutors', { tutors }))
    .catch(err => next(err))
  },
  getTutor: (req, res, next) => {
    Tutor.findByPk(req.params.id, { //去資料庫用 id 找一筆資料
      raw: true, // 找到以後整理格式再回傳
      nest: true,
      include: [Category] 
    })
      .then(tutor => {
        if (!tutor) throw new Error("Tutor didn't exist!") //  如果找不到，回傳錯誤訊息，後面不執行
        res.render('admin/tutor', { tutor })  
      })
      .catch(err => next(err))
    },
  editTutor: (req, res, next) => { 
    return Promise.all([
      Tutor.findByPk(req.params.id, { raw: true }),
      Category.findAll({ raw: true })
    ])
    .then(([tutor, categories]) => {
      if (!tutor) throw new Error("Tutor didn't exist!")
      res.render('admin/edit-tutor', { tutor, categories })
    })
    .catch(err => next(err))
  },
  putTutor: (req, res, next) => {
    const selectedDays = req.body.booking;
    const { name, tel, introduction, teachingStyle, tutorTime, videoLink, categoryId } = req.body
    if (!name) throw new Error('Tutor name is required!')
    const { file } = req 
  Promise.all([ // 非同步處理
      Tutor.findByPk(req.params.id), // 去資料庫查有沒有這間餐廳
      localFileHandler(file) // 把檔案傳到 file-helper 處理 
    ])
      .then(([tutor, filePath]) => {
        if (!tutor) throw new Error("Tutor didn't exist!")
        booking = JSON.stringify(selectedDays)
        return tutor.update({
          name,
          tel,
          introduction,
          teachingStyle,
          tutorTime,
          videoLink,
          categoryId,
          booking,
          image: filePath || tutor.image
        })
      })
      .then(() => {
        req.flash('success_messages', 'Tutor was successfully to update')
        res.redirect('/admin/tutors')
      })
      .catch(err => next(err))
  },
  deleteTutor: (req, res, next) => { // 新增以下
    return Tutor.findByPk(req.params.id)
      .then(tutor => {
        if (!tutor) throw new Error("Tutor didn't exist!")
        return tutor.destroy()
      })
      .then(() => res.redirect('/admin/tutors'))
      .catch(err => next(err))
  },
  getUsers: (req, res, next) => {
    return User.findAll({
      raw: true
    })
      .then(users => res.render('admin/users', { users }))
      .catch(err => next(err))
  },
  patchUser: (req, res, next) => { // 新增這段
    return User.findByPk(req.params.id)
      .then(user => {
        if (user.email === 'root@example.com') {
          req.flash('error_messages', '禁止變更 root 權限')
          return res.redirect('back')
        }
        return user
      })
      .then(user => user.update({ isAdmin: !user.isAdmin }))
      .then(() => {
        req.flash('success_messages', '使用者權限變更成功')
        res.redirect('/admin/users')
      })
      .catch(err => next(err))
  }
}
module.exports = adminController