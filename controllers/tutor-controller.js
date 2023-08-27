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
  }
}

module.exports = tutorController