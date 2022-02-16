const router = require('express').Router()
const ownRoutes = require('./own.route')
const tickerRoutes = require('./ticker.route')

router.use('/own', ownRoutes)
router.use('/ticker', tickerRoutes)

module.exports = router
