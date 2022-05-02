const { Router } = require('express');
const { getAllDogs, getDogById, createDog } = require('./controllers/breedController')
const { getAllTemperamentsFromApi} = require('./controllers/temperamentController')

const router = Router();

//ojo unicas API permitidas son:
// 1) -GET https: //api.thedogapi.com/v1/breeds
// 2) -GET https: //api.thedogapi.com/v1/breeds/search?q={raza_perro}
// la 2da la usaremos para el componente search y para la busqueda de detalle de cada raza
// usando el nombre completo de la raza, que funciona en los hechos como un ID
router.get('/dogs', getAllDogs);    
router.get('/dogs/:id', getDogById);
router.get('/temperaments', getAllTemperamentsFromApi);
router.post('/dogs', createDog);
router.get('*', function (req, res) {
  res.status(404).send('Ruta no encontrada');
});


module.exports = router;
