## Exercise 2 - Introduction to Express

#### #1 Install Express as an `npm` dependency

Type `npm install express --save` in the terminal and press enter.

You should see logs printed, as shown below.

```
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN solution@1.0.0 No repository field.

+ express@4.17.1
added 50 packages from 37 contributors and audited 50 packages in 1.575s
found 0 vulnerabilities
```

Open your `package.json`. Verify that there is new entry under `dependencies`.

```json
{
  "name": "solution",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    // this was added automatically because of the `--save` flag
    "express": "^4.17.1"
  }
}
```

Celebrate :tada:! You just added your first `npm` dependency succesfully!

#### #2 Create an Express web application

In your `app.js` file, copy the following code

```node
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Welcome to TechLadies'));

app.listen(3001, () => {
  console.log('Example app listening on port 3001!')
})
```

Save it and run `npm start`.

Visit `http://localhost:3001/` - you should see your welcome message in your browser.

Press `Ctrl+C` to stop the server.

Let's go ahead and modify our code to return `json` instead of a `string`.

Remove the following line,
```node
app.get('/', (req, res) => res.send('Welcome to TechLadies'));
```
and replace with this
```node
app.get('/', (req, res) => res.json({ message: 'Welcome to TechLadies' }));
```

Start the server again with `npm start` and refresh your browser. You should now see your updated message! :clap: :clap:

**Bonus Tip**
To avoid having to restart your server everytime you change `app.js`, install `nodemon` as a dev dependency and update your start script to use `nodemon` instead of `node`. `nodemon` will watch your files for changes and restart the server automatically when required.

#### #3 Create routing middleware

Let's start building our routes now.

We'll first refactor our first route to be ... as a middleware.

Create a folder called `routes` and add a file called `index.js` inside it.

Add the following code to `routes/index.js`

```node
  const express = require('express')
  const router = express.Router()

  /* GET home page. */
  router.get('/', function (req, res) {
    res.json({ message: 'Welcome to TechLadies' })
  })

  module.exports = router
```

Now, modify your `app.js` file to import our newly created `routes/index.js`. Use that as the route handler.

Your `app.js` should finally look like this:
```node
const express = require('express')
// TODO: Import your file
const indexRouter = require('./routes/index')

const app = express();

// TODO: Replace your current function with the imported handler
// app.get('/', (req, res) => res.json({ message: 'Welcome to TechLadies' }));
app.use('/', indexRouter)

app.listen(3001, () => {
  console.log('Example app listening on port 3001!')
})
```

Verify `http://localhost:3001/` is still working as before.

Let's add some new routes now.


### #4 Add some more rotes

Let's add some more routes now! We'll try to create a route similar to the one we used in our [Vue.js workshop]().

We'll be creating the following routes:


| Route       | Description |
| ----------- | ----------- |
| /api/breeds/      | Return data on all dogs          |
| /api/breeds/images   | Return images of all dogs        |
| /api/breeds/random   | Return a random dog image        |


In the `routes` folder, add a file called `dogs.js`.

```node
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
```

Import and use your new routes in `app.js`
```node
  const express = require('express')
  const indexRouter = require('./routes/index')
  // TODO: Add this
  const dogsRouter = require('./routes/dogs')

  const app = express();

  app.use('/', indexRouter)

  // Add this:
  /* GET breed routes. */
  app.use('/api/dogs', dogsRouter)


  app.listen(3001, () => {
    console.log('Example app listening on port 3001!')
  })
```

Visit the following paths and verify that they work!

- `http://localhost:3001/`
- `http://localhost:3001/api/breeds/images`
- `http://localhost:3001/api/breeds/images/random`


Awesome!! You are now a route champ! :tada::tada:

> Note: You'll notice that we used a constant array called `DOGS` for our data. This should ideally be stored in a database. We'll learn how to do that in our next exercise.

### Recommended Readings

- [MDN](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment)