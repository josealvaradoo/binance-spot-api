const binance = require('../config')

class TickerController {
	static async get(req, res) {
		const item = req?.params.par

		try {
			await binance.useServerTime()
			const prices = await binance.prices()

			await binance.balance(async (error, balances) => {
				if (error) throw 'Ups, has ocurred an error!'

				res.status(200).json({
					data: {
						name: item?.toUpperCase(),
						price: Number(Number(prices?.[`${item?.toUpperCase()}USDT`]).toFixed(2))
					},
					error: null,
				})
			})
		} catch (e) {
			res.status(500).json({
				data: null,
				error: e?.message,
			})
		}
	}
}

module.exports = TickerController
