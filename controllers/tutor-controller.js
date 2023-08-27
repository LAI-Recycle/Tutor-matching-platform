const { Tutor, Category } = require('../models')

const tutorController = {
  getTutors: (req, res) => {
    return Tutor.findAll({
      include: Category,
      nest: true,
      raw: true
    }).then(tutors => {
      const data = tutors.map(r => ({
        ...r,
        courseDescription: r.courseDescription.substring(0, 50)
      }))
      return res.render('tutors', {
        tutors: data
      })
    })
  },
  getTutor: (req, res, next) => {
    return Tutor.findByPk(req.params.id, {
      include: Category, // 拿出關聯的 Category model
      nest: true,
      raw: true
    })
      .then(tutor => {
        if (!tutor) throw new Error("Tutor didn't exist!")
        res.render('tutor', {
          tutor
        })
      })
      .catch(err => next(err))
  }
}

module.exports = tutorController