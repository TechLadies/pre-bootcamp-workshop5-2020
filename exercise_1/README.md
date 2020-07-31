## Exercise 1 - Introduction to Node.js

#### #1 Create a Node.js script

Create a file `app.js` with the following code:

```node
console.log('Welcome to Techladies!')
```

Save it.

Now, in your terminal, type `node app.js`.

You should see your message printed on the terminal.

Congratulations! You've created your first node.js script! :tada: :tada:

#### #2 Create a Node.js project

Let's create a node.js project with `npm`. Type `npm init`. The utility will walk you through the process of creating a `package.json` file. When you are prompted to specify an entry point, make sure it is `app.js`. For everything else, press enter to accept the suggested defaults.

You should now have a `package.json` file.

Let's go ahead and add a script to our `package.json` to run `node app.js` when we type `npm start`.

In your `package.json` file, add `"start": "node app.js"` inside `scripts`.

Your `package.json` should now look like this:

```json
{
  "name": "solution",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Save the file.

Now type `npm start` in your terminal and press enter. You should see your message printed again!

#### #3 Install a package

We'll now learn how to install a package.

Type `npm install upper-case --save`.

You should see something similar to this.
```
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN solution@1.0.0 No description
npm WARN solution@1.0.0 No repository field.

+ upper-case@2.0.1
added 2 packages from 2 contributors and audited 2 packages in 1.059s
found 0 vulnerabilities
```

Verify that your `package.json` has a new entry `upper-case` under `dependencies`.

Now, modify your `app.js` file to look like the one below:

```node
var uc = require('upper-case');

console.log(uc.upperCase("Welcome to Techladies"))
```

Run `npm start` again. Do you see something different? :smile:

#### #4 Interact with your database

##### macOS

Start Postico. You should see all your databases listed.

Let's create a new database for ourselves.

Click on the `+Database` button and add a database called `techladies`.

You should now see a new database in your view (use the refresh button if you don't). Double-click on the created database to view the contents of your database.

Now, we'll add a `table` to our database.

Click on the `+Table` button to add a table and populate it with some data.

##### Windows

Start **pgAdmin**. You should see a database server listed on the left hand panel. By default it is named `PostgresSQL 12`.

Double click on it and enter the password if prompted. You would have set this password some time during or after the installation of pgadmin.

Right click on `Database` and click `Create > Database`. In the window, give your database a name.

Expand the name of your database and open `schemas > public`, then right click on `Tables` and click `Create > Table`.

In the `General` tab, give the table a name, and under the `Columns` tab, click the `+` button to add a column. You can give it any name, and you can choose `character varying` for the Data Type.

Right click on your table in the left panel navigation, and click `Scripts > INSERT Script`. In the text editor on the right, replace the `?` with some data.

---

Bravo! You now have your own database with some data! :tada: :tada: :grin:

#### Additional Task

Try out a few SQL queries to query data in your new table!