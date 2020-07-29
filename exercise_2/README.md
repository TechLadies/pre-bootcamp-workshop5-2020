## Exercise 2 - Introduction to Express

Navigate into the `starter-code` folder for this exercise

#### #1 Create an Express web application

Type `npm install express --save` in the terminal and press enter.

You should see logs printed, as shown below.

```
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN solution@1.0.0 No repository field.

+ express@4.17.1
added 50 packages from 37 contributors and audited 50 packages in 1.575s
found 0 vulnerabilities
```

Open your `package.json`. Verify that there is new entry `"express": "^4.17.1"` under `dependencies`.

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
    "express": "^4.17.1"
  }
}
```

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

**Bonus Tip:**
To avoid having to restart your server everytime you change `app.js`, install `nodemon` as a dev dependency and update your start script to use `nodemon` instead of `node`. `nodemon` will watch your files for changes and restart the server automatically when required.

#### #2 Understanding middleware

Let's now use Router-level middleware for our routes.

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

Now, modify your `app.js` file to import our newly created `routes/index.js` middleware and bind this to your application.

Your `app.js` should finally look like this:

```node
const express = require('express')
const indexRouter = require('./routes/index')

const app = express();

app.use('/', indexRouter)

app.listen(3001, () => {
  console.log('Example app listening on port 3001!')
})
```

Verify `http://localhost:3001/` still works as before.

### #3 Add some more rotes

Let's add some more routes now!

We'll try to create an api similar to the one we used in our [Vue.js workshop](https://workshops.vuevixens.org/workshops/vue/minis/mini1.html#install-vuetify).

Here's a summary of what we'll be making:

| Name       | Method | Query Params | Description |
| ----------- | ---- | --- | ----------- |
| /api/dogs/      | GET | breed (optional) | Return data on all dogs          |
| /api/dogs/:id   | GET |  | Return a dog by id       |


In the `routes` folder, add a file called `dogs.js` with the following code,

```node
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
```

Import and use your new routes in `app.js`

```node
const express = require('express')
const indexRouter = require('./routes/index')
const dogsRouter = require('./routes/dogs')

const app = express();

app.use('/', indexRouter)
app.use('/api/dogs', dogsRouter)

app.listen(3001, () => {
  console.log('Example app listening on port 3001!')
})
```

Visit the following paths and verify that they work!

- `http://localhost:3001/api/dogs/`
- `http://localhost:3001/api/dogs/?breed=chow`
- `http://localhost:3001/api/dogs/1`

Awesome!! You are now a route champ! :tada::tada:

> Note: You'll notice that in the `helpers/dogs` file we used a constant array called `DOGS` for our data. This should ideally be stored in a database. We'll learn how to do that in our next exercise.
