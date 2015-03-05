'use strict';

class Logger
	constructor: (outputMethod)->
		@output = outputMethod or console.log
	message: (message) ->
		@output message
	error: (message, exception) ->
		@output message
	warning: (message) ->

module.exports = Logger