require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const apiRouter = require('../app/routes')

app.get('/', async (req, res) => {
	res.json({
		message: 'Welcome to your Binance Spot API',
	})
})

app.use('/api/v1', apiRouter)

app.listen(port, () => {
	console.log('Listen on port :', port)
})
