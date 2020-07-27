const express = require('express')
const router = express.Router()
const db  = require('../models/dog')

router.get('/', async(req, res) => {
  const dogs = await db.Dog.query().select('breed', 'image')
  res.json(dogs)
})

router.post('/', async(req, res) => {
  try {
    const response = await db.Dog.query().insert(req.body)
    res.json(response)
  } catch(ex) {
    res.status(500).json({ error: ex })
  }
})

router.delete('/:id', async(req, res) => {
  try {
    const response = await db.Dog.query().where('id', req.params.id).del()
    res.json(response)
  } catch(ex) {
    res.status(500).json({ error: ex })
  }
})

router.get('/images', async(req, res) => {
  const dogImages = await db.Dog.query().pluck('image')
  res.json(dogImages)
})

router.get('/images/random', async (req, res) => {
  // get a random dog image
  const randomDogImages = await db.Dog.query().orderByRaw('RANDOM()').limit(1).pluck('image')
  const response = {
      message: randomDogImages[0],
      status: "success",
  }

  res.json(response)
})

router.get('*', async (req, res) => {
  res.status(404).json({ message: 'resource not found' })
})


module.exports = router
