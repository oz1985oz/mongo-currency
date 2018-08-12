var Currency = require('../models/Currency.js')
class CurrencyCtrl {
	static getAll (req, res) {
		var db = req.app.get('db')
		Currency.getAll(db, req.params.base)
		.then(data => {
			var newBase = data.find((data) => {
				return data.name == req.params.base;
			});
			var newBar = data.map((x) => {
				x.base = newBase.name;
				x.rate = x.rate/newBase.rate;
				return x;
			})
			res.json(newBar)
		})
	}
	static getConvert (req, res) {
		var db = req.app.get('db')
		Currency.getConvert(db, req.params.currencyName, req.params.toCurrencyName, req.params.amount)
		.then((data) => {
			var from = data.find((data) => {
				return data.name == req.params.currencyName;
			});
			var to = data.find((data) => {
				return data.name == req.params.toCurrencyName;
			});
			console.log(to)
			var result = (from.rate/to.rate)*Number(req.params.amount);
			return res.json(result)
		})
	}
}

module.exports = CurrencyCtrl