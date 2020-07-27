### Exercise 2: Introduction to routes
This will introduce you to express and routes

### Steps

- run `npm init` - setup defaults
- install dependences - express (dependency)
- install dependencies - nodemon (dev dependence)

#### Setup express in `app.js`
Create a file `app.js` and the code to it:

```js
  const express = require('express')
  const app = express();

  app.listen(8000, () => {
    console.log('Example app listening on port 8000!')
  })
```

Run this file with `node app.js`

You should see something like below:

TODO: Add image

### Use `npm` to start your server | add nodemon

#### Create your first route
```js
  const express = require('express')
  const app = express();

  // add this
  const router = express.Router()
  router.get('/', function (req, res) {
    res.json({ message: 'Welcome to TechLadies' })
  })

  app.listen(3001, () => {
    console.log('Example app listening on port 3001!')
  })
```

### Refactor the route
We'll now create our first route. Create a `routes` folder and `index.js` file inside it.
Add the following code to it:

explain nodejs exports/imports

```js
  const express = require('express')
  const router = express.Router()

  /* GET home page. */
  router.get('/', function (req, res) {
    res.json({ message: 'Welcome to TechLadies' })
  })

  module.exports = router
```

### Let's create another route to return dog images

- Create a `breeds.js` folder in routes
- add code to it

```js
  const express = require('express')
  const { route } = require('.')
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


  router.get('/heartbeat', async(req, res) => {
    res.json({ status: 'ok' })
  })

  router.get('/images', async(req, res) => {
    const dogImages = DOGS.map((dog) => dog.image)
    return dogImages
  })

  router.get('/images/random', async (req, res) => {
    // get a random dog image
    const randomDogImage = DOGS[Math.floor(Math.random() * IMAGES.length)].image;
    const response = {
      message: randomDogImage,
      status: "success",
    }

    res.json(response)
  })

  module.exports = router
```

- add it to `app.js`

```js
/* GET breed routes. */
app.use('/api/breeds', breedsRouter)
```

Visit `http://localhost:3001/api/breeds/images/random` and it should give you a random image


### Additional
Use nodemon to automatically start your server and add it as an `npm` script