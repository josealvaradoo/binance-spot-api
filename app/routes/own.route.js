const router = require('express').Router()
const OwnController = require('../controllers/own.controller')

router.get('/', OwnController.index)

module.exports = router
