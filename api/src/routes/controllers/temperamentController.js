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


async function getAllTemperaments(req, res, next) {

}

module.exports = { getAllTemperaments}