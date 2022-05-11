const { Op } = require("sequelize");
const axios = require("axios");
const { Breed, Temperament, breedTemperament } = require("../../db");
const { API_KEY } = process.env;

// usando try / catch
async function getAllDogs(req, res, next) {
  let breedsFromApi;
  let breedsFromDb;

  try {
    breedsFromApi = await axios({
      headers: {
        "x-api-key": API_KEY,
      },
      method: "get",
      url: "https://api.thedogapi.com/v1/breeds",
    }).then((results) => results.data);
  } catch (error) {
    next(error);
  }

  try {
    // aqui tendria que hacer algo similar a lo que hago abajo con API creando un campo temperament
    // en el que transformo el arreglo de temperamentos en un string o en un array?
    breedsFromDb = await Breed.findAll();
  } catch (error) {
    next(error);
  }

  Promise.all([breedsFromApi, breedsFromDb])
    .then((respuesta) => {
      // console.log(breedsFromApi, breedsFromDb);
      // porque usaba breedsApi.map????
      let filteredBreedsApi = breedsFromApi.map((breed) => {
        return {
          id: breed.id,
          name: breed.name,
          height: breed.height.metric,
          weight: breed.weight.metric,
          temperament: breed.temperament ? breed.temperament.split(", ") : [],
          life_span: breed.weight.metric ? breed.weight.metric : "",
          image: breed.image.url ? breed.image.url : "",
        };
      });

      // console.log(BreedsDB);
      let allBreeds = [...filteredBreedsApi, ...breedsFromDb];
      res.status(200).send(allBreeds);
      
    })
    .catch((error) => next(error));
}

async function getDogById(req, res, next) {
  const { id } = req.params;

  let breedsFromApi;
  let breedsFromDb;

  try {
    breedsFromApi = await axios({
      headers: {
        "x-api-key": API_KEY,
      },
      method: "get",
      url: "https://api.thedogapi.com/v1/breeds",
    }).then((results) => results.data);
  } catch (error) {
    next(error);
  }

  try {
    // aqui tendria que hacer algo similar a lo que hago abajo con API creando un campo temperament
    // en el que transformo el arreglo de temperamentos en un string o en un array?
    breedsFromDb = await Breed.findAll();
  } catch (error) {
    next(error);
  }

  Promise.all([breedsFromApi, breedsFromDb])
    .then((respuesta) => {
      let filteredBreedsApi = breedsFromApi.map((breed) => {
        return {
          id: breed.id,
          name: breed.name,
          height: breed.height.metric,
          weight: breed.weight.metric,
          temperament: breed.temperament ? breed.temperament.split(", ") : [],
          life_span: breed.weight.metric ? breed.weight.metric : "",
          image: breed.image.url ? breed.image.url : "",
        };
      });

      let allBreeds = [...filteredBreedsApi, ...breedsFromDb];

      if (id) {
          let breed = allBreeds.filter((el) => el.id == id);
          breed.length
            ? res.status(200).json(breed)
            : res
                .status(404)
                .send(`Sorry, we don´t have a breed with ${id} as ID 🤷‍♀️`);
        }
    })
    .catch((error) => next(error));
}

async function createDog(req, res, next) {
  try {
    const {
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      life_span,
      image,
      temperaments,
    } = req.body;

    const newBreed = await Breed.create({
      name,
      life_span,
      weight: heightMin + " - " + heightMax,
      height: weightMin + " - " + weightMax,
      image,
    });

    temperaments.map(async (t) => {
      const dbTemperament = await Temperament.findOrCreate({
        where: {
          name: t,
        },
      });
      newBreed.addTemperament(dbTemperament[0].dataValues.ID);
    });

    res.status(201).send(newBreed);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllDogs,
  getDogById,
  createDog,
};
