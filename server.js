const
  dotenv = require('dotenv'),
  express = require('express'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  app = express(),
  MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/podfreq',
  PORT = process.env.PORT || 3001,
  usersRoutes = require('./routes/users.js')
;

mongoose.connect(MONGODB_URI, (err) => {
  console.log(err || `🖖🏾 Connected to MongoDB @ ${MONGODB_URI}`)
})

app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({message: "API root."})
})

app.use('/users', usersRoutes)

app.listen(PORT, (err) => {
  console.log(err || `🤘🏾 Server running on ${PORT}`)
})