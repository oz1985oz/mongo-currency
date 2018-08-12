var ObjectId = require('mongodb').ObjectId;

class Currency {
	static getAll (db, base) {
		return db.collection('currency').find().toArray()
	}
	static getConvert (db, currencyName, toCurrencyName, amount) {
		return db.collection('currency').find( { $or: [ { name: currencyName }, { name: toCurrencyName } ] } 
		).toArray()
	}
}

module.exports = Currency