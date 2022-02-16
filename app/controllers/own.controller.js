const binance = require('../config')

class OwnController {
	static async index(req, res) {
		let pars = req?.query?.exclude || ''
		let total = 0
		let cryptocurrencies = []

		if (pars) {
			pars = pars?.toUpperCase()?.split(',')
		} else {
			pars = []
		}

		try {
			await binance.useServerTime()
			const prices = await binance.prices()

			await binance.balance(async (error, balances) => {
				if (error) throw 'Ups, has ocurred an error!'
				const coins = Object.keys(balances)?.filter(
					(item) => Number(balances?.[item]?.available) > 0
				)

				coins.map((item) =>
					cryptocurrencies.push({
						label: item,
						amount: Number(balances?.[item]?.available),
						value: Number(
							Number(
								item === 'USDT'
									? balances?.[item]?.available
									: balances?.[item]?.available * prices?.[`${item}USDT`]
							).toFixed(2)
						),
					})
				)

				total = cryptocurrencies?.reduce(
					(acc, value) => (acc += value?.value),
					0
				)

				cryptocurrencies = cryptocurrencies?.reduce(
					(acc, coin) => ({
						...acc, [coin?.label]: {
							amount: coin?.amount,
							value: coin?.value,
							price: coin?.label === 'USDT' ? 1 : Number(Number(prices?.[`${coin?.label}USDT`]).toFixed(2))
						}
					}),
					{}
				)

				const getAvailable = () => (
					pars.reduce((acc, par) => (
						acc -= cryptocurrencies?.[par]?.value
					), total)
				)

				res.status(200).json({
					data: {
						available: Number(Number(getAvailable()).toFixed(2)),
						coins: cryptocurrencies,
						total: Number(Number(total).toFixed(2)),
					},
					error: null,
				})
			})
		} catch (e) {
			res.status(500).json({
				data: cryptocurrencies,
				error: e?.message,
			})
		}
	}
}

module.exports = OwnController
