const { Router } = require('express');
const { getAllDogs, getDogById, createDog } = require('./controllers/breedController')
const { getAllTemperamentsFromDb} = require('./controllers/temperamentController')

const router = Router();

router.get('/dogs', getAllDogs);    
// router.get('/dogs/:id', getAllDogs);
router.get('/temperaments', getAllTemperamentsFromDb);
router.post('/dogs', createDog);
router.get('*', function (req, res) {
  res.status(404).send('Ruta no encontrada');
});


module.exports = router;
