const bcrypt = require('bcryptjs') 
const { User , Tutor , Course , Category} = require('../models/')
const { localFileHandler } = require('../helpers/file-helpers')

const userController = {
  signUpPage: (req, res) => {
    res.render('signup')
  },
  signUp: (req, res, next) => {
    if (req.body.password !== req.body.passwordCheck) throw new Error('Passwords do not match!')
    User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user) throw new Error('Email already exists!') 
        return bcrypt.hash(req.body.password, 10) // 前面加 return
      })
      .then(hash => User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
      }))
      .then(() => {
        req.flash('success_messages', '成功註冊帳號！')
        res.redirect('/signin')
      })
      .catch(err => next(err))
  },
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: (req, res) => {
    req.flash('success_messages', '成功登入！')
    res.redirect('/tutors')
  },
  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('/signin')
  },
  getUser: (req, res, next) => {
    return User.findByPk(req.params.id, { raw: true })
      .then(user => {
        if (!user) throw new Error("User doesn't exist!")
        return res.render('users/profile', { user })
      })
      .catch(err => next(err))
  },
  editUser: (req, res, next) => {
    return User.findByPk(req.params.id, {
      raw: true
    })
      .then(user => {
        if (!user) throw new Error("User doesn't exist!")
        return res.render('users/edit', { user })
      })
      .catch(err => next(err))
  },
  putUser: (req, res, next) => {
    const { name, nation, aboutMe } = req.body
    const { file } = req
    return Promise.all([
      User.findByPk(req.params.id),
      localFileHandler(file)
    ])
      .then(([user, filePath]) => {
        if (!user) throw new Error("User doesn't exist!")
        return user.update({
          name: name || user.name,
          nation: nation,
          aboutMe: aboutMe,
          image: filePath || user.image
        })
      })
      .then(() => {
        req.flash('success_messages', '使用者資料編輯成功')
        res.redirect(`/users/${req.params.id}`)
      })
      .catch(err => next(err))
  },
  addCourse: (req, res, next) => {
    const { tutorId } = req.params
    const { booking } = req.body
    return Promise.all([
      Tutor.findByPk(tutorId),
      Course.findOne({
        where: {
          userId: req.user.id,
          tutorId
        }
      })
    ])
      .then(([tutor, course]) => {
        if (!tutor) throw new Error("tutor didn't exist!")
        if (course) throw new Error('You have booking this tutor!')
        return Course.create({
          userId: req.user.id,
          tutorId,
          booking
        })
      })
      .then(() => {
        res.render(`tutor-booking`)
      })
      .catch(err => next(err))
  },
  createTutor: (req, res, next) => { 
    return Category.findAll({
      raw: true
    })
      .then(categories => res.render('users/create-tutor', { categories }))
      .catch(err => next(err))
  },
  postTutor: (req, res, next) => {
    const selectedDays = req.body.booking;
    const { name, tel, introduction, teachingStyle, tutorTime, videoLink, categoryId } = req.body  // 從 req.body 拿出表單裡的資料
    if (!name) throw new Error('Tutor name is required!') 
    booking = JSON.stringify(selectedDays)
    const { file } = req
    return Promise.all([
      User.findByPk(req.params.id),
      localFileHandler(file)
    ])
    .then(([user, filePath]) => {
        if (!user) throw new Error("User doesn't exist!")
        if (user.isTutor === true) throw new Error("You are already a tutor!")
        user.update({
          isTutor: 1 
        }),
        Tutor.create({ // 再 create 這筆餐廳資料
          name,
          tel,
          introduction,
          teachingStyle,
          tutorTime,
          videoLink,
          categoryId,
          booking,
          image: filePath || null
        })
      })
      .then(() => {
        req.flash('success_messages', 'Tutor was successfully created') // 在畫面顯示成功提示
        res.redirect('/tutors') //新增完成後導回後台首頁
      })
      .catch(err => next(err))
  },
  getTutor: (req, res, next) => {
    return Promise.all([
      User.findByPk(req.params.id),
      Tutor.findOne({ 
        where: { 
          userId: req.params.id 
        }
      })
    ])
      .then(([user , tutor ]) => {
        if (!tutor) throw new Error("Tutor didn't exist!")
        if (!user) throw new Error("User didn't exist!")
        res.render('users/tutorprofile', { tutor : tutor.toJSON() , user : user.toJSON() })
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
      res.render('users/tutorprofile-edit', { tutor, categories })
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
        console.log("===================481859serid")
        console.log(tutor.userId)
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
      .then(tutor => {
        req.flash('success_messages', 'Tutor was successfully to update')
        res.redirect(`/users/tutors/${tutor.userId}`)
      })
      .catch(err => next(err))
  }
}
module.exports = userController