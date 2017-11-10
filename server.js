const
  dotenv = require('dotenv').load(),
  express = require('express'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  app = express(),
  MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/podfreq',
  PORT = process.env.PORT || 3001,
  usersRoutes = require('./routes/users.js'),
  podcastRoutes = require('./routes/podcasts.js'),
  episodeRoutes = require('./routes/episodes.js')
;

mongoose.connect(MONGODB_URI, (err) => {
  console.log(err || `🖖🏾 Connected to MongoDB @ ${MONGODB_URI}`)
})

app.use(express.static(`${__dirname}/client/build`))
app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({message: "API root."})
})

app.use('/users', usersRoutes)
app.use('/podcasts', podcastRoutes)
app.use('/episodes', episodeRoutes)

app.use('*', (req, res) => {
	res.sendFile(`${__dirname}/client/build/index.html`)
})

app.listen(PORT, (err) => {
  console.log(err || `🤘🏾 Server running on ${PORT}`)
})