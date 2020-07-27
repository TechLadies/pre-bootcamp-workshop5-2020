# NodeJS Backend Starter Kit

## Post-Forking Steps

1. Update `knexfile.js` with the correct database names for Development and Test databases.

## Initial setup steps for local development

2. Copy `env.sample` to `.env`
3. Prepare the databases

	```
	NODE_ENV=development npm run db:migrate
	NODE_ENV=test npm run db:migrate
	```

4. Prepare the seed data for development

	```
	NODE_ENV=development npm run db:seed
	```

5. Start the app for local development

	```
	npm run dev
	```

6. Visit `http://localhost:3001/users` to view the seeded user data (not all fields are shown).

## Windows Users

Some things to note:

- Use "Git bash" to run the commands above.
- After copying `.env` file, open it up and update the `DB_USER` and `DB_PASSWORD` to what you have set for your Postgres root user in Windows.