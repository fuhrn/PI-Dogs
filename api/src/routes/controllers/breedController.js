const { Op } = require("sequelize");
const axios = require("axios");
const { Breed, Temperament, breedTemperament } = require("../../db");
const { API_KEY } = process.env;

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
      const [breedsApi, breedsDb] = respuesta;
      // vamos a filtrar la API con los campos que me interesan solamente
      let filteredBreedsApi = breedsApi.map((breed) => {
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

      let allBreeds = [...filteredBreedsApi, ...breedsDb];

      res.send(allBreeds);
    })
    .catch((error) => next(error));
}

// ruta que usaremos para ver la pagina de detalle de cada breed
async function getDogById(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({ message: "no dog id, search failed" });
    }

    let dog;
    if (typeof id === "string" && id.length > 9) {
      try {
        dog = await Breed.findByPk(id, {
          include: [
            {
              model: Temperament,
              attributes: ['name']
            },
          ],
        });
      } catch (error) {
        
      }
    } else {
      dog = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`)
        .then(dog => dog.data)
        .then(dog => {
          return {
          id: dog.id
        }
      })
    }
    res.status(200).send(dog);
  } catch (error) {
    throw new Error("DB: no existe dog Id");
  }
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
