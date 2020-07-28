## Exercise 1 - Introduction to Node.js

#### #1 Try out the node console

Type `node` in the command-line and press enter. You should see an interactive node console environment like below:

```node
Welcome to Node.js v12.18.2.
Type ".help" for more information.
>
```

Let's try typing some code in the console - `console.log('Hello TechLadies!')`

```node
Welcome to Node.js v12.18.2.
Type ".help" for more information.
> console.log('Hello TechLadies!')
```

You should see your message printed out

```node
Welcome to Node.js v12.18.2.
Type ".help" for more information.
> console.log('Hello TechLadies!')
Hello TechLadies!
```

To exit, press `Ctrl+C` twice

#### #2 Create a Node.js script

Create a file `app.js` with the following code:

```node
console.log('I love to code!')
```

Save it.

Now, in your terminal, type `node app.js`.

You should see your message printed on the terminal.

Congratulations! You've created your first node.js script! :tada: :tada:

#### #3 Create a Node.js project

Let's create a node.js project with `npm`. Type `npm init` to create a new node.js project. Accept defaults for all fields in the `package.json` file, by pressing enter.

You should now have a `package.json` file.

Let's go ahead and add a script to our `package.json` to run `node app.js` when we type `npm start`.

Add `"start": "node app.js",` to the `scripts` object. Your `package.json` should now look like this:

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
  "license": "ISC"
}
```

Save the file.

Now type `npm start` in your terminal, and your should see your message printed again.

#### #4 Interact with your database

Start Postico. You should see all your databases listed.

Let's create a new database for ourselves.

Click on the `+Database` button and add a database called `techladies`.

You should now see a new database in your view (use the refresh button if you don't). Double-click on the created database to view the contents of your database.

Now, we'll add a `table` to our database.

Click on the `+Table` button to add a table and populate it with some data.

Bravo! You now have your own database with some data! :tada: :tada: :grin:

#### Additional Task

Try out a few SQL queries to query data in your new table!