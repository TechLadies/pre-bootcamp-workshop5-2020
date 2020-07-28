### Route Management

#### Getting started

We've added a `nodejs-starter` folder, based-off the TechLadies [nodejs-starter-kit]() to fasttrack you into working with your database. It already contains the routes we've built in our previous exercises - you can find them in the `src` folder

To set it up, please follow the steps outlined

1. Change directory to `nodejs-starter` and run `npm install`
2. We created a database called `techladies` in our first exercise. Verify that the `knexfile.js` is initialized with the same database name. If you used a different name, please change this value to be the same as your database's name.
3. Copy `env.sample` to `.env` and add your `DB_USERNAME` and `DB_PASSWORD`
4. Run the following commands to prepare the databases and seed them with some dummy data
	```
	NODE_ENV=development npm run db:migrate
	NODE_ENV=development npm run db:seed
	```
5. Start the app with `npm run dev`
6. Visit `http://localhost:3001/` and verify that all the routes your created before work as expected

> Note for Windows Users
> - Use "Git bash" to run the commands above.
> - After copying `.env` file, open it up and update the `DB_USER` and > `DB_PASSWORD` to what you have set for your Postgres root user in Windows.


#### #1 Connect dogRouter to your database

Start `Postico`.

In the `techladies` database, verifiy that you have two tables - `dogs` and `users`. These have been created by the `npm run db:migrate` and `npm run db:seed` commands that we ran initially.

We'll now use our `dogs` table to get the data for our dog-based routes.

Modify the routes in `src/routes/dogs.js` to use the database, as shown below,

```node
const express = require('express')
const router = express.Router()
const db = require('../models/dog')

router.get('/', async (req, res) => {
	const dogs = await db.Dog.query().select('breed', 'image')
	res.json(dogs)
})

router.get('/images', async (req, res) => {
	const dogImages = await db.Dog.query().pluck('image')
	res.json(dogImages)
})

router.get('/images/random', async (req, res) => {
	// get a random dog image
	const randomDogImages = await
		db.Dog.query()
		.orderByRaw('RANDOM()')
		.limit(1)
		.pluck('image')

	const response = {
		message: randomDogImages[0],
		status: 'success'
	}

	res.json(response)
})

module.exports = router
```

Save the changes and verify that all your routes still work.

Bravo! You have now unlocked the database superpower in your developer journey! :tada:

#### #2 Use Postman to check your routes

It can be tiring to constantly check the browser for every route. It is also limiting because we cannot use this method efficiently to test for routes that create, update or delete data.

Use Postman to create a collection of routes - so that we can easily check them.

#### #3 Add a route to create data

Let's add a route to create a new dog.

Add the following route in your `src/routes/dogs.js` file.

```node
router.post('/', async (req, res) => {
	try {
		const response = await db.Dog.query().insert(req.body)
		res.json(response)
	} catch (ex) {
		res.status(500).json({ error: ex })
	}
})
```

Try to create a new dog using the following data, with a Postman `POST` to `http://localhost:3001/api/dogs/`

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

Try to make the same request again. This time, you'll receive a `UniqueViolationError` error because the dog image already exists in our database

#### #4 Delete a dog

We'll now attempt to delete the dog we just created.

Add the following route in your `src/routes/dogs.js` file.

```node
router.delete('/:id', async (req, res) => {
	try {
		const response = await db.Dog.query().where('id', req.params.id).del()
		res.json(response)
	} catch (ex) {
		res.status(500).json({ error: ex })
	}
})
```

Now use Postman to send a `DELETE` request to `http://localhost:3001/api/dogs/:id` where `:id` is id of the dog from the last step, for eg `http://localhost:3001/api/dogs/21`

If the dog is successfully deleted, you'll recieve `1` as a response.

If no dogs were deleted, you'll receive `0`


### Time to celebrate!

Thanks for sticking around till the end of this workshop!