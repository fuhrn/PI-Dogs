const { Router } = require('express');
const { getAllDogs, getDogById, createDog } = require('./controllers/breedController')
const { getAllTemperamentsFromDb} = require('./controllers/temperamentController')

const router = Router();

router.get('/dogs', getAllDogs);    
router.get('/dogs/:id', getDogById);

// router.get("/dogs/:id", async (req, res, next) => {
//   const { id } = req.params;
//   const allDogs = await getDogById();
//   console.log(allDogs);
//   res.status(200).send(id);
//   // if (raceId) {
//   //   let race = await allRaces.filter((el) => el.id == raceId);
//   //   race.length
//   //     ? res.status(200).json(race)
//   //     : res
//   //         .status(404)
//   //         .send(`Sorry, we don´t have a race with ${raceId} as ID 🤷‍♀️`);
//   // }
// });

router.get('/temperaments', getAllTemperamentsFromDb);
router.post('/dogs', createDog);
router.get('*', function (req, res) {
  res.status(404).send('Ruta no encontrada');
});


module.exports = router;
