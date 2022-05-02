const {
  Op
} = require("sequelize");
const axios = require("axios");
const {
  Breed,
  Temperament,
  breedTemperament
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
// FALTA el filtrado por temperamento y por tipo de raza: API y creada -> desde redux
// FALTA la busqueda por nombre para el boton search --> desde redux
async function getAllDogs(req, res, next) {
  let breedsFromApi;
  let breedsFromDb;
  try {
    breedsFromApi = await axios({
        headers: {
          'x-api-key': API_KEY
        },
        method: 'get',
        url: "https://api.thedogapi.com/v1/breeds"
      })
      .then(results => results.data)
  } catch (error) {
    next(error)
  }

  try {  
    breedsFromDb = await Breed.findAll()
  } catch (error) {
    next(error)
  }

  Promise.all([breedsFromApi, breedsFromDb])
    .then(respuesta => {
      const [breedsApi, breedsDb] = respuesta;
      // vamos a filtrar la API con los campos que me interesan solamente
      let filteredBreedsApi = breedsApi.map(breed => {
        return {
          id: breed.id,
          name: breed.name,
          height: breed.height.metric,
          weight: breed.weight.metric,
          life_span: breed.weight.metric
        }
      })

      let allBreeds = [...filteredBreedsApi, ...breedsDb]
      res.send(allBreeds)
    })
  .catch(error => next(error))
}

// ruta que usaremos para ver la pagina de detalle de cada breed
async function getDogById(req, res, next) {
  try {
    const {
      id
    } = req.params;

    await axios({
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
  try {
    const {
      name,
      life_span,
      weight,
      height,
      temperaments
    } =
    req.body;

    const newBreed = await Breed.create({
      name,
      life_span,
      weight,
      height
    });

    temperaments.map( async t => {
      const dbTemperament = await Temperament.findOrCreate({
        where: {
          name: t
        }
      });
      newBreed.addTemperament(dbTemperament[0].dataValues.ID)
    })
    
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