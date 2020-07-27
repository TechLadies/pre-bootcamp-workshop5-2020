
const { tableName } = require('../src/models/dog')

const SEED_DOGS = [
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

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(tableName)
  .del()
  .then(function () {
    // Inserts seed entries
    return knex(tableName).insert(SEED_DOGS)
  })
};
