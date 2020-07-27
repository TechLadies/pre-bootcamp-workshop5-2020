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

### Let's create another route

Let's try to create the one Jen used in her vue workshop

- Create a `breeds.js` folder in routes
- add code to it

```js
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
```

- add it to `app.js`

```js
/* GET breed routes. */
app.use('/api/breeds', breedsRouter)
```

Visit `http://localhost:3001/api/breeds/images/random` and it should give you a random image


### Additional
Use nodemon to automatically start your server and add it as an `npm` script