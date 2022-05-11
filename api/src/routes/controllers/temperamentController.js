const { Op } = require("sequelize");
const axios = require("axios");
const { Breed, Temperament } = require("../../db");
// const recipes = require("../../json/recipesAPI.json");
const { API_KEY } = process.env;

// funcion auxiliar usada en index.js para precargar Db, y tambien en la ruta /temperament (no obligatoria)
function getTemperaments() {
  return axios({
    headers: {
      "x-api-key": API_KEY,
    },
    method: "get",
    url: "https://api.thedogapi.com/v1/breeds",
  })
    .then((results) => results.data)
    .then((results) => results.map((breed) => breed.temperament))
    .then((results) => results.filter((temperaments) => temperaments != null))
    .then((results) => results.map((temperaments) => temperaments.split(", ")))
    .then((results) => results.flat())
    .then((results) =>
      results.filter((item, index) => {
        return results.indexOf(item) === index;
      })
    )
    .then((results) => results.sort())
    .then((results) =>
      results.map((temperament) => {
        return {
          name: temperament,
        };
      })
    )
    .then((results) => Temperament.bulkCreate(results))
    .catch((err) => console.log("Error inicial carga Db: ", err.message));
}

// esto consultarlo desde la base de datos
async function getAllTemperamentsFromDb(req, res, next) {
  try {
    await Temperament.findAll().then((results) => res.send(results));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllTemperamentsFromDb,
  getTemperaments,
};
