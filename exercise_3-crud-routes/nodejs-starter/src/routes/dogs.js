const express = require('express')
const router = express.Router()

const DOGS = [
  {
    breed: 'chihuahua',
    image: 'https://raw.githubusercontent.com/jigsawpieces/dog-api-images/master/chihuahua/n02085620_10074.jpg',
  },
  {
    breed: 'chow',
    image: 'https://github.com/jigsawpieces/dog-api-images/blob/master/chow/modi2.jpg',

  },
  {
    breed: 'rottweiler',
    image: 'https://github.com/jigsawpieces/dog-api-images/blob/master/rottweiler/n02106550_1033.jpg'
  },
  {
    breed: 'golden-retriever',
    image: 'https://github.com/jigsawpieces/dog-api-images/blob/master/retriever-golden/n02099601_100.jpg'
  },
  {
    breed: 'husky',
    image: 'https://github.com/jigsawpieces/dog-api-images/blob/master/husky/n02110185_10047.jpg'
  }
]

router.get('/', async(req, res) => {
  res.json(DOGS)
})

router.get('/images', async(req, res) => {
  const dogImages = DOGS.map((dog) => dog.image)
  res.json(dogImages)
})

router.get('/images/random', async (req, res) => {
  // get a random dog image
  const randomDogImage = DOGS[Math.floor(Math.random() * DOGS.length)].image;
  const response = {
      message: randomDogImage,
      status: "success",
  }

  res.json(response)
})

module.exports = router
