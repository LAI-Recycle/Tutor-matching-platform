const { Tutor, Category } = require('../models')

const tutorController = {
  getTutors: (req, res, next) => {
    const categoryId = Number(req.query.categoryId) || ''

    return Promise.all([
      Tutor.findAll({
      include: Category,
      where: {  // 新增查詢條件
          ...categoryId ? { categoryId } : {} // 檢查 categoryId 是否為空值
        },
      nest: true,
      raw: true
      }),
      Category.findAll({ raw: true })
    ])
    .then(([tutors,categories ]) => {
      const data = tutors.map(r => ({
        ...r,
        courseDescription: r.courseDescription.substring(0, 50)
      }))
      return res.render('tutors', {
        tutors: data,
        categories,
        categoryId
      })
    })
  },
  getTutor: (req, res, next) => {
    return Tutor.findByPk(req.params.id, {
      include: [Category]
    })
      .then(tutor => {
        if (!tutor) throw new Error("Tutor didn't exist!")
        return tutor.increment('viewCounts', { by: 1 })
      })
      .then(tutor => res.render('tutor', {tutor: tutor.toJSON() }))
      .catch(err => next(err))
  }
}

module.exports = tutorController