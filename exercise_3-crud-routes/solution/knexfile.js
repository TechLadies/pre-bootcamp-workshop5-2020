require('dotenv').config()

module.exports = {
  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      user: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD,
      database: 'techladies',
    },
  },
  test: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      user: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD,
      database: 'techladies',
    },
  },
}
