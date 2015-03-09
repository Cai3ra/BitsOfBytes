'use strict';
path = require 'path'

class DependencyResolver
	constructor: (@logger) ->
		@logger.help """
		The dependency resolver was initialized...
		Use this tool for include general and custom dependencies
		Thanks and good coding!!!
		Starting to resolve dependencies...
		-----------------------------------
		"""
	load: (dependencyName, dependencyPath) ->
		@logger.data """
		loading #{dependencyName}...
		"""
		try
			if dependencyPath.indexOf('\\') > -1 or dependencyPath.indexOf('/') > -1
				dependencyPath = path.join "#{do process.cwd}", "#{dependencyPath}"
			
			dependency = require dependencyPath

			@logger.info """
			* #{dependencyName} loaded ...
			"""
		catch e
			@logger.error "critical error loading #{dependencyName} \r\n error: #{e}\ 
			\r\n*********************************", e
		dependency

module.exports = DependencyResolver