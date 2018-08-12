var express = require('express')
var mongodb = require('mongodb')
var MongoClient = mongodb.MongoClient;
var currenciesRouter = require('./routes/currenciesRouter')

var connectionPromise = MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }); // it's a promise
var db;

var app = express();
app.use(currenciesRouter);

app.get('/', (req, res) => {
	res.redirect('/currencies/all/base=ILS')
})

connectionPromise.then(connection => {
	db = connection.db('currencies')	
	app.set('db', db)		
	app.listen('3000', () => { 
		setInterval( () => {
			var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
			var update5to7per = plusOrMinus * (Math.random()*.02+0.05) + 1;
			var count = db.collection('currency').find().count().then(data => {
				count = data
				var idRandom = Math.floor(Math.random()*(count-1)) + 2;
				db.collection('currency').updateOne( { "orderID" : idRandom }, { $mul: { rate: update5to7per }});
			});
		}, 1000)
		console.log('listen')
	})
}).catch(err => console.error(err));

// db.currency.insert({name: "ILS", rate: 1})
// db.currency.insert({name: "USD", rate: 3.6840})
// db.currency.insert({name: "EUR", rate: 4.2726})
// db.currency.insert({name: "CAD", rate: 2.8147})
// db.currency.insert({name: "DKK", rate: 0.5732})
// db.currency.insert({name: "GPY100", rate: 3.3184})
