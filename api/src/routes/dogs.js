const router  = require('express').Router()
const {getDogs, getDogByID, getDogByName, postDog, randomDog} = require('../controllers/dogController')

router.get('/random', randomDog)
router.get('/', getDogs) // arreglo de objetos, donde cada objeto es la raza de un perro.
router.get('/name', getDogByName) // /name?="..."  obtener todas aquellas razas de perros que coinciden con el nombre recibido
router.get('/:idRaza', getDogByID) //  objeto con la información pedida en el detalle de un perro
router.post('/', postDog) // datos necesarios para crear un nuevo perro y relacionarlo con los temperamentos asociado


module.exports = router