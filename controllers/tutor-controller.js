const { Tutor, Category, Comment, User } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')

const tutorController = {
  getTutors: (req, res, next) => {
    const DEFAULT_LIMIT = 12
    const categoryId = Number(req.query.categoryId) || ''
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    const offset = getOffset(limit, page)

    return Promise.all([
      Tutor.findAndCountAll({
      include: Category,
      where: {  // 新增查詢條件
          ...categoryId ? { categoryId } : {} // 檢查 categoryId 是否為空值
        },
        limit ,
        offset,
        nest: true,
        raw: true
      }),
      Category.findAll({ raw: true })
    ])
    .then(([tutors,categories ]) => {
      const data = tutors.rows.map(r => ({
        ...r,
        courseDescription: r.courseDescription.substring(0, 50)
      }))
      return res.render('tutors', {
        tutors: data,
        categories,
        categoryId,
        pagination: getPagination(limit, page, tutors.count)
      })
    })
  },
  getTutor: (req, res, next) => {
    return Tutor.findByPk(req.params.id, {
      include: [ 
        Category,
        { model: Comment, include: User }
      ]
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