const { Tutor } = require('../models')

const adminController = {
  getTutors: (req, res) => {
    Tutor.findAll({
      raw: true
    })
    .then(tutors => res.render('admin/tutors', { tutors }))
    .catch(err => next(err))
  }
}
module.exports = adminController