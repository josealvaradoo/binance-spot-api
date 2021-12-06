const binance = require('../config')

class OwnController {
	static async index(req, res) {
		let total = 0
		let cryptocurrencies = []
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
					(acc, coin) => ({ ...acc, [coin?.label]: coin?.value }),
					{}
				)

				res.status(200).json({
					data: {
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
