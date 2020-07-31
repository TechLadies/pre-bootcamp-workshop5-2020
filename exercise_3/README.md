### Route Management

#### Getting started

To get you up and running quickly with the database,
we have added the `nodejs-starter` (derived from the [TechLadies nodejs-starter-kit](https://github.com/TechLadies/nodejs-backend-starterkit)). It already contains code to setup, seed and connect to your database. It also has the routes built in the previous exercises. You can find `app.js` and `routes` inside the `src` folder of the `nodejs-starter`

The `nodejs-starter` requires some setup. Please follow the steps below:

1. Navigate to the `nodejs-starter` and run `npm install`
2. We created a database called `techladies` in our first exercise. Verify that the `knexfile.js` is initialized with the same database name. If you used a different name, please change this value to be one that you used.
3. Create a new file called `.env`. Copy the contents from `env.sample` to `.env` and add your `DB_USERNAME` and `DB_PASSWORD` to it
4. Run the following commands in the terminal to prepare the databases and seed them with some dummy data
	```
	NODE_ENV=development npm run db:migrate
	NODE_ENV=development npm run db:seed
	```
5. Start the app with `npm run dev`
6. Visit `http://localhost:3001/` and verify that all the routes your created before work as expected

> Note for Windows Users
> - Use "Git bash" to run the commands above.
> - After copying `.env` file, open it up and update the `DB_USER` and > `DB_PASSWORD` to what you have set for your Postgres root user in Windows.


#### #1 Working with the database

Start `Postico`.

In the `techladies` database, verify that you have two tables - `dogs` and `users`. These have been created by the `npm run db:migrate` and `npm run db:seed` commands that we ran initially. If you don't see the tables, try refreshing your view.

The dog routes use functions from a helper file at `src/helpers/dogs.js`. Open up this file and have a look the code.

You'll now change the functions in this file to use data from our `dogs` table for our routes instead of using a static array.

Update the file `src/helpers/dogs.js`, with the following code

```node
const db = require('../models/dog')

exports.getAllDogs = async function() {
  const dogs = await db.Dog.query().select()
  return dogs
}

exports.getDogById = async function(id) {
  const dogsById = await db.Dog.query().select().where('id', id)
  return dogsById[0] || 'Not found'
}

exports.getDogsByBreed = async function(breed) {
  const dogsByBreed = await db.Dog.query().select().where('breed', breed)
  return dogsByBreed
}
```

Since the functions are now asynchronous, you'll also need to modify your `src/routes/dogs` file to `await` the functions, as show below:

```
const express = require('express')
const dogs = require('../helpers/dogs')
const router = express.Router()

router.get('/', async (req, res) => {
  const breed = req.query.breed
  const result = breed ? await dogs.getDogsByBreed(breed) : await dogs.getAllDogs()
  res.status(200).json(result)
})

router.get('/:id', async (req, res) => {
  const result = await dogs.getDogById(req.params.id)
  res.status(200).json(result)
})

module.exports = router
```

Save the changes and verify that all your routes still work.

Bravo! You have now unlocked the database superpower in your developer journey! :tada:

#### #2 Use Postman

It can be tiring to keep testing each route on the browser. It is also limiting because it cannot be used efficiently to test requests other than `GET`

Use Postman to create a collection of all the routes you've created so far.

#### #3 Add a route to create data

Now, let us add a route to create a new dog.

Add the following function in your `src/helpers/dogs.js` file.

```node
exports.addDog = async function(dog) {
  try {
    const response = await db.Dog.query().insert(dog)
    return response
  } catch(err) {
    return { err }
  }
}
```

... and a corresponding route in your `src/routes/dogs.js` file to use this function,

```node
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
      });
    }

    return
  }

  res.status(200).json(result)
})
```

The above code checks for a `UniqueViolationError`. So, remember import that in your dog routes file, at the top.

```
const { UniqueViolationError } = require('objection')
```

Try to `POST` a new dog with the following properties to `http://localhost:3001/api/dogs` using Postman

```
{
	"breed": "hound",
	"image": "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg"
}
```

Verify that you get a response similar to the one below (the id might be different):

```
{
    "breed": "hound",
    "image": "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg",
    "id": 21
}
```

Remember this `id`.

You can also check the `dogs` table in your database to verify that the dog was added to the table.

Try to make the same request again. This time, you'll receive a `UniqueViolationError` error because the dog image already exists in our database. The `try...catch` block helps us handle this error and return a suitable response

#### #4 Delete a dog

You'll now attempt to delete the dog you just created.

Add the function below into your `src/helpers/dogs.js` file:

```node
exports.deleteDog = async function(id) {
  const response = await db.Dog.query().where('id', id).del()
  return response
}
```

and now add a route to use the function in `src/routes/dogs.js` file

```node
router.delete('/:id', async (req, res) => {
  const response = await dogs.deleteDog(req.params.id)
  res.json(response)
})
```

Use Postman to send a `DELETE` request to `http://localhost:3001/api/dogs/:id` where `:id` is id of the dog from the last step, for eg `http://localhost:3001/api/dogs/21`

If the dog is successfully deleted, you'll recieve `1` as a response.

If no dogs were deleted, you'll receive `0`


### Time to celebrate! :tada: :tada: :tada: :tada:

Kudos to you on completing the workshop!

[![LGTM](https://lgtm.lol/p/584)](https://lgtm.lol/i/584)