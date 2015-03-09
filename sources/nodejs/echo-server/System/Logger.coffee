'use strict';
colors = require 'colors'

class Logger
	constructor: (outputMethod)->
		colors.setTheme
			silly: 'rainbow'
			input: 'grey'
			verbose: 'cyan'
			prompt: 'grey'
			info: 'green'
			data: 'grey'
			help: 'cyan'
			warn: 'yellow'
			debug: 'blue'
			error: 'red'
		@output = outputMethod or console.log
	info: (message) ->
		@output message.info
	error: (message, exception) ->
		@output message.error
	warning: (message) ->
		@output message.warn
	help: (message) ->
		@output message.help
	data: (message) ->
		@output message.data

module.exports = Logger