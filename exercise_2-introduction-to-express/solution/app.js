
const express = require('express')
const indexRouter = require('./routes/index')
const breedsRouter = require('./routes/breeds')

const app = express();

/**
 * Step 3:
 * Moved to ./routes/index after refactoring
 */
// const router = express.Router()
// router.get('/', function (req, res) {
//   res.json({ message: 'Welcome to TechLadies' })
// })

/* GET home page. */
app.use('/', indexRouter)

/* GET breed routes. */
app.use('/api/breeds', breedsRouter)


app.listen(3001, () => {
  console.log('Example app listening on port 3001!')
})