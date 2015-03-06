'use strict';

class Logger
	constructor: (outputMethod)->
		@output = outputMethod or console.log
	message: (message) ->
		@output message
	error: (message, exception) ->
		@output message.red
	warning: (message) ->

module.exports = Logger