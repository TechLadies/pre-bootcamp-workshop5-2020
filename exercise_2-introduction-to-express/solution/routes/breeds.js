const express = require('express')
const { route } = require('.')
const router = express.Router()

const IMAGES = [
  "https:\/\/images.dog.ceo\/breeds\/ridgeback-rhodesian\/n02087394_8935.jpg",
  "https:\/\/images.dog.ceo\/breeds\/samoyed\/n02111889_1374.jpg",
  "https:\/\/images.dog.ceo\/breeds\/lhasa\/n02098413_4651.jpg",
  "https:\/\/images.dog.ceo\/breeds\/finnish-lapphund\/mochilamvan.jpg",
  "https:\/\/images.dog.ceo\/breeds\/whippet\/n02091134_13376.jpg",
]

router.get('/heartbeat', async(req, res) => {
  res.json({ status: 'ok' })
})

router.get('/images/random', async (req, res) => {
  // get a random dog image
  const randomDogImage = IMAGES[Math.floor(Math.random() * IMAGES.length)];
  const response = {
    message: randomDogImage,
    status: "success",
  }

  res.json(response)
})

module.exports = router
