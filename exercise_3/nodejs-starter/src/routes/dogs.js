const express = require('express')
const dogs = require('../helpers/dogs')
const router = express.Router()

router.get('/', async (req, res) => {
  const breed = req.query.breed
  const result = breed ? dogs.getDogsByBreed(breed) : dogs.getAllDogs()
  res.status(200).json(result)
})

router.get('/:id', async (req, res) => {
  const result = dogs.getDogById(req.params.id)
  res.status(200).json(result)
})

module.exports = router