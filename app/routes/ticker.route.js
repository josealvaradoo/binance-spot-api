const router = require('express').Router()
const TickerController = require('../controllers/ticker.controller')

router.get('/:par', TickerController.get)

module.exports = router
