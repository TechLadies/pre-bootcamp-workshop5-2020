const DOGS = [
  {
    id: 1,
    breed: 'chihuahua',
    image: 'https://raw.githubusercontent.com/jigsawpieces/dog-api-images/master/chihuahua/n02085620_10074.jpg',
  },
  {
    id: 2,
    breed: 'chow',
    image: 'https://github.com/jigsawpieces/dog-api-images/blob/master/chow/modi2.jpg',

  },
  {
    id: 3,
    breed: 'rottweiler',
    image: 'https://github.com/jigsawpieces/dog-api-images/blob/master/rottweiler/n02106550_1033.jpg'
  },
  {
    id: 4,
    breed: 'golden-retriever',
    image: 'https://github.com/jigsawpieces/dog-api-images/blob/master/retriever-golden/n02099601_100.jpg'
  },
  {
    id: 5,
    breed: 'husky',
    image: 'https://github.com/jigsawpieces/dog-api-images/blob/master/husky/n02110185_10047.jpg'
  }
]

function getDogsByProperty(property, value) {
  return DOGS.filter(dog => dog[property] === value)
}

exports.getAllDogs = function() {
  return DOGS
}

exports.getDogById = function(id) {
  const dogsById = getDogsByProperty('id', parseInt(id))
  return dogsById[0] || 'Not found'
}

exports.getDogsByBreed = function(breed) {
  const dogsByBreed = getDogsByProperty('breed', breed)
  return dogsByBreed
}