less = require 'gulp-less'
watch = require 'gulp-watch'
path = require 'path'

class LessTask
	constructor: (@gulp, @config, @basePath="/app", @buildPath="/build") ->
		if @config is null
			@config =
				from: "#{basePath}/style/less/*.less"
				to: "#{buildPath}/style/css/"
		console.log @config

	setupTask: ->
		@gulp.src @config.from
			.pipe watch @config.from
			.pipe do less
			.pipe @gulp.dest @config.to

if module? and module.exports?
	module.exports = LessTask