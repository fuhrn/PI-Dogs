const { Op } = require("sequelize");
const axios = require("axios");
const { Breed, Temperament, breedTemperament } = require("../../db");
const { API_KEY } = process.env;

async function deleteDog(req, res, next) {
  try {
    const id = req.params.id;
    const dog = await Breed.findByPk(id);
    if (!dog) {
      res.status(400).send("Dog no encontrado");
    }
    await dog.destroy();
    res.status(200).send(`se ha borrado el perro con el id ${id}`)
    } catch (error) {
      next(error);
    }
}

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
    breedsFromDb = await Breed.findAll({
      include: [
        {
          model: Temperament,
          // as: "temperament",
          attributes: ["name"],
        },
      ],
    }).then((result) =>
      result.map((breed) => {
        return {
          id: breed.id,
          name: breed.name,
          height: breed.height,
          weight: breed.weight,
          // FUNCIONA!!!.....
          temperaments: breed.temperaments.map((temp) => temp.name),
          life_span: breed.life_span,
          image: breed.image
        };
      })
    );

  } catch (error) {
    next(error);
  }

  Promise.all([breedsFromApi, breedsFromDb])
    .then((respuesta) => {
      let filteredBreedsApi = breedsFromApi.map((breed) => {
        return {
          id: breed.id.toString(),
          name: breed.name,
          height: breed.height.metric,
          weight: breed.weight.metric,
          temperaments: breed.temperament ? breed.temperament.split(", ") : [],
          life_span: breed.weight.metric ? breed.weight.metric : "",
          image: breed.image.url ? breed.image.url : "",
        };
      });

      let allBreeds = [...filteredBreedsApi, ...breedsFromDb];
      res.status(200).send(allBreeds);
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
  // getDogById,
  createDog,
  deleteDog
};
