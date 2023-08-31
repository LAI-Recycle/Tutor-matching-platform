const { Comment, User, Tutor } = require('../models')
const commentController = {
  postComment: (req, res, next) => {
    const { tutorId, text } = req.body
    const userId = req.user.id
    if (!text) throw new Error('Comment text is required!')
    return Promise.all([
      User.findByPk(userId),
      Tutor.findByPk(tutorId)
    ])
      .then(([user, tutor]) => {
        if (!user) throw new Error("User didn't exist!")
        if (!tutor) throw new Error("Tutor didn't exist!")
        return Comment.create({
          text,
          tutorId,
          userId
        })
      })
      .then(() => {
        res.redirect(`/tutors/${tutorId}`)
      })
      .catch(err => next(err))
  }
}
module.exports = commentController