const getUser = req => {
  console.log("===============================================AAA===========================")
  console.log(req.user)
  return req.user || null
}
const ensureAuthenticated = req => {
  return req.isAuthenticated()
}
module.exports = {
  getUser,
  ensureAuthenticated
}