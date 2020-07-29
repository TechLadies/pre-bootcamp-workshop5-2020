'use strict'

const { Model } = require('objection')
const tableName = 'dogs'

class Dog extends Model {
  static get tableName () {
    return tableName
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['image'],
      properties: {
        id: { type: 'integer' },
        breed: { type: 'string' },
        image: { type: 'string' }
      }
    }
  }
}

module.exports = {
  Dog,
  model: Dog,
  tableName
}
