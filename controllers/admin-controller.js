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
        req.flash('success_messages', 'tutor was successfully created') // 在畫面顯示成功提示
        res.redirect('/admin/tutors') //新增完成後導回後台首頁
      })
      .catch(err => next(err))
  }
}
module.exports = adminController