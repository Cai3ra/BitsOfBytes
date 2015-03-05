'use strict';
path = require 'path'

class DependencyResolver
	constructor: (@logger) ->
		@logger.message """
		Have been initialized the general dependency resolver... 
		Use this tool for general and custom dependency purposes and all your actions will be logged
		Thanks and good coding!!!

		starting to resolve dependencies...
		-----------------------------------
		"""
	load: (dependencyName, dependencyPath) ->
		@logger.message """
		loading #{dependencyName}...
		"""
		try
			if dependencyPath.indexOf('\\') > -1 or dependencyPath.indexOf('/') > -1
				dependencyPath = path.join "#{do process.cwd}", "#{dependencyPath}"
			
			dependency = require dependencyPath

			@logger.message """
			* #{dependencyName} loaded ...
			"""
		catch e
			@logger.error "critical error loading #{dependencyName} \r\n error: #{e}\ 
			*********************************", e
		dependency

module.exports = DependencyResolver