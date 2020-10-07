const db = require('../models/dog')

exports.getAllDogs = async function() {
  const dogs = await db.Dog.query().select()
  return dogs
}

exports.getDogsByBreed = async function(breed) {
  const dogsByBreed = await db.Dog.query().select().where('breed', breed)
  return dogsByBreed
}

exports.addDog = async function(dog) {
  try {
    const response = await db.Dog.query().insert(dog)
    return response
  } catch(err) {
    return { err }
  }
}

exports.deleteDog = async function(id) {
  const response = await db.Dog.query().where('id', id).del()
  return response
}


