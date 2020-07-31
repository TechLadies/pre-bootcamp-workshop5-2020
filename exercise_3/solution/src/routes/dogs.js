const express = require('express')
const dogs = require('../helpers/dogs')
const router = express.Router()
const { UniqueViolationError } = require('objection')

router.get('/', async (req, res) => {
  const breed = req.query.breed
  const result = breed ? await dogs.getDogsByBreed(breed) : await dogs.getAllDogs()
  res.status(200).json(result)
})

router.post('/', async (req, res) => {
  const result = await dogs.addDog(req.body)

  // handle error
  if (result.err) {
    const err = result.err
    if (err instanceof UniqueViolationError) {
      res.status(409).send({
        message: err.message,
        type: 'UniqueViolation',
        data: {
          columns: err.columns,
          table: err.table,
          constraint: err.constraint
        }
      })
    } else {
      res.status(500).send({
        message: err.message,
        type: 'UnknownError',
        data: {}
      })
    }

    return
  }

  res.status(200).json(result)
})

router.get('/:id', async (req, res) => {
  const result = await dogs.getDogById(req.params.id)
  res.status(200).json(result)
})

router.delete('/:id', async (req, res) => {
  const response = await dogs.deleteDog(req.params.id)
  res.json(response)
})

module.exports = router
