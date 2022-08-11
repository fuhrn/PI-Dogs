const { Router } = require('express');
const { getAllDogs, createDog, deleteDog } = require('./controllers/breedController')
const { getAllTemperamentsFromDb, getTemperaments} = require('./controllers/temperamentController')

const router = Router();

router.get('/dogs', getAllDogs);    
// router.get('/dogs/:id', getAllDogs);
router.get('/temperaments', getAllTemperamentsFromDb);

// ruta para carga inicial de BC
router.get("/initialload", getTemperaments);

router.post('/dogs', createDog);
router.get('*', function (req, res) {
  res.status(404).send('Ruta no encontrada');
});

router.delete('/dogs/:id', deleteDog )


module.exports = router;
