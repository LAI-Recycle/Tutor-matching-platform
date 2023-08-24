const { Tutor } = require('../models')

const adminController = {
  getTutors: (req, res) => {
    Tutor.findAll({
      raw: true
    })
    .then(tutors => res.render('admin/tutors', { tutors }))
    .catch(err => next(err))
  },
  createTutor: (req, res) => {    
    return res.render('admin/create-tutor')  
  },
  postTutor: (req, res, next) => {
    
    const { name, tel, courseDescription, teachingStyle } = req.body  // 從 req.body 拿出表單裡的資料
    if (!name) throw new Error('Tutor name is required!') 
    Tutor.create({ //產生一個新的 Restaurant 物件實例，並存入資料庫
      name,
      tel,
      courseDescription,
      teachingStyle
    })
      .then(() => {
        req.flash('success_messages', 'Tutor was successfully created') // 在畫面顯示成功提示
        res.redirect('/admin/tutors') //新增完成後導回後台首頁
      })
      .catch(err => next(err))
  },
  getTutor: (req, res, next) => {
    Tutor.findByPk(req.params.id, { //去資料庫用 id 找一筆資料
      raw: true // 找到以後整理格式再回傳
    })
      .then(tutor => {
        if (!tutor) throw new Error("Tutor didn't exist!") //  如果找不到，回傳錯誤訊息，後面不執行
        res.render('admin/tutor', { tutor })  
      })
      .catch(err => next(err))
    },
  editTutor: (req, res, next) => { // 新增這段
   Tutor.findByPk(req.params.id, {
    raw: true
  })
    .then(tutor => {
      if (!tutor) throw new Error("Tutor didn't exist!")
      res.render('admin/edit-tutor', { tutor })
    })
    .catch(err => next(err))
  },
  putTutor: (req, res, next) => {
    const { name, tel, courseDescription, teachingStyle } = req.body
    if (!name) throw new Error('Tutor name is required!')
    Tutor.findByPk(req.params.id)
      .then(tutor => {
        if (!tutor) throw new Error("Tutor didn't exist!")
        return tutor.update({
          name,
          tel,
          courseDescription,
          teachingStyle
        })
      })
      .then(() => {
        req.flash('success_messages', 'Tutor was successfully to update')
        res.redirect('/admin/tutors')
      })
      .catch(err => next(err))
  }
}
module.exports = adminController