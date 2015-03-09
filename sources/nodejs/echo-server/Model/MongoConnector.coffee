Mongoose = require 'Mongoose'

class MongoConnector
	constructor: ->
		db = Mongoose.connection;

		db.on 'error', console.error
		db.once 'open', ->
		  console.log 'Conectado ao MongoDB.'

		Mongoose.connect 'mongodb://127.0.0.1/test'

module.exports = MongoConnector