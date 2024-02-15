const dogsRouter = require('./dogs')
const temperamentsRouter = require('./temperaments')
const router  = require('express').Router()

router.use('/dogs', dogsRouter)
router.use('/temperaments', temperamentsRouter)


module.exports = router;
