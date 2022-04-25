const {
  Op
} = require("sequelize");
const axios = require("axios");
const {
  Breed,
  Temperament
} = require("../../db");
const {
  API_KEY
} = process.env;

// usando promises
// function getAllDogs(req, res, next) {
//     let breedsFromApi = axios({
//         headers: {
//           'x-api-key': API_KEY
//         },
//         method: 'get',
//         url: "https://api.thedogapi.com/v1/breeds"
//       })
//       .then(results => results.data)
//       .then(results => res.send(results))
//       .catch(error => next(error))
// }


// usando try / catch
async function getAllDogs(req, res, next) {
  try {
    let breedsFromApi = await axios({
        headers: {
          'x-api-key': API_KEY
        },
        method: 'get',
        url: "https://api.thedogapi.com/v1/breeds"
      })
      .then(results => results.data)
      .then(results => res.send(results))
  } catch (error) {
    next(error)
  }
}

async function getDogById(req, res, next) {
  try {
    const {
      id
    } = req.params;
    let breedsFromApi = await axios({
        headers: {
          'x-api-key': API_KEY
        },
        method: 'get',
        url: `https://api.thedogapi.com/v1/breeds/search?q=${id}`
      })
      .then(results => results.data)
      .then(results => res.send(results))
  } catch (error) {
    next(error)
  }
}

async function createDog(req, res, next) {
  console.log('hola');

  try {
    const {
      name,
      life_span,
      weight,
      height
    } =
      req.body;
    
    console.log('nombre: ',name)

    const newBreed = await Breed.create({
      name,
      life_span,
      weight,
      height
    });

    res.status(201).send(newBreed);
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllDogs,
  getDogById,
  createDog
}