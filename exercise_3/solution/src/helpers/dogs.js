const db = require('../models/dog')

exports.getAllDogs = async function () {
  const dogs = await db.Dog.query().select()
  return dogs
}

exports.getDogById = async function (id) {
  const dogsById = await db.Dog.query().select().where('id', id)
  return dogsById[0] || 'Not found'
}

exports.getDogsByBreed = async function (breed) {
  const dogsByBreed = await db.Dog.query().select().where('breed', breed)
  return dogsByBreed
}

exports.addDog = async function (dog) {
  try {
    const response = await db.Dog.query().insert(dog)
    return response
  } catch (err) {
    return { err }
  }
}

exports.deleteDog = async function (id) {
  const response = await db.Dog.query().where('id', id).del()
  return response
}
