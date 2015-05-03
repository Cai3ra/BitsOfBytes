coffee = require 'gulp-coffee'
watch = require 'gulp-watch'
path = require 'path'

class CoffeeTask
	constructor: (@gulp, @config, @basePath="/app", @buildPath="/build") ->
		if @config is null
			@config =
				from: "#{basePath}/scripts/coffee/*.coffee"
				to: "#{buildPath}/scripts/js/"	

	setupTask: ->
		@gulp.src @config.from
			.pipe watch @config.from
			.pipe do coffee
			.pipe @gulp.dest @config.to

if module? and module.exports?
	module.exports = CoffeeTask