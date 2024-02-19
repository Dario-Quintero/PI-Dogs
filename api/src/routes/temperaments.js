const router  = require('express').Router()
const {getTemperaments} = require('../controllers/temperamentsController')

router.get('/', getTemperaments)

module.exports = router;