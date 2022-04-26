const {
  Op
} = require("sequelize");
const axios = require("axios");
const {
  Breed,
  Temperament
} = require("../../db");
// const recipes = require("../../json/recipesAPI.json");
const {
  API_KEY
} = process.env;


async function getAllTemperamentsFromApi(req, res, next) {
  try {
    let breedsFromApi = await axios({
        headers: {
          'x-api-key': API_KEY
        },
        method: 'get',
        url: "https://api.thedogapi.com/v1/breeds"
      })
      .then(results => results.data)
      .then(results => results.map(breed => breed.temperament))
      .then(results => results.filter(temperaments => temperaments != null))
      .then(results => results.map(temperaments => temperaments.split(', ')))
      .then(results => results.flat())
      .then(results => results.filter((item, index) => {
        return results.indexOf(item) === index;
      }))
      .then(results => results.map(temperament => {
        return {
          name: temperament
        }
      }))
      .then(results => Temperament.bulkCreate(results))
      .then(results => res.send('anduvo todo bien'))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllTemperamentsFromApi
}