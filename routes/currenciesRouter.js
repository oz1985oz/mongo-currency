var express = require('express')
var router = express.Router();
var CurrencyCtrl = require('../controllers/CurrencyCtrl.js')

router.get('/currencies/all/base=:base', CurrencyCtrl.getAll)

router.get('/currencies/from=:currencyName&to=:toCurrencyName&amount=:amount', CurrencyCtrl.getConvert)

module.exports = router;