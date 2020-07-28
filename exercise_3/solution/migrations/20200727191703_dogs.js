const { tableName } = require('../src/models/dog')

exports.up = (knex) => {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary()
    table.text('breed').notNullable()
    table.text('image').notNullable().unique()
    table.timestamps(true, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable(tableName)
}
