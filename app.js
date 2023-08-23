const express = require('express')
const handlebars = require('express-handlebars')
const routes = require('./routes')
const passport = require('./config/passport')

const app = express()
const port = process.env.PORT || 3000
const db = require('./models')

app.engine('hbs', handlebars({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(routes)

app.listen(port, () => {
  console.info(`Example app listening on port ${port}!`)
})

module.exports = app