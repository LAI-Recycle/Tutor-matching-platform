const adminController = {
  getTutors: (req, res) => {
    return res.render('admin/tutors')
  }
}
module.exports = adminController