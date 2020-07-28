
const express = require('express')
const indexRouter = require('./routes/index')
const dogsRouter = require('./routes/dogs')

const app = express();

/* GET home page. */
app.use('/', indexRouter)

/* GET breed routes. */
app.use('/api/dogs', dogsRouter)


app.listen(3001, () => {
  console.log('Example app listening on port 3001!')
})