const router = require('express').Router()
const ownRoutes = require('./own.route')

router.use('/own', ownRoutes)

module.exports = router
