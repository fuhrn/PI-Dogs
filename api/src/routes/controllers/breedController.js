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

function getAllDogs(req, res, next) {
  let breedsFromApi = axios({
      headers: {
        'x-api-key': API_KEY
      },
      method: 'get',
      url: "https://api.thedogapi.com/v1/breeds"
  })
    .then(results => results.data)
    .then(results => res.send(results))

}

async function getDogById(req, res, next) {

}

async function createDog(req, res, next) {

}

module.exports = {
  getAllDogs,
  getDogById,
  createDog
}