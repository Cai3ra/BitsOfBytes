browserSync = require 'browser-sync'
gulp = require 'gulp'
allTasks = require './gulp-tasks'

class Gulpfile
	constructor: ->
		@serverPath = '/'
		@environment = 'dev'
		@startTasks = []

	addTask: (task, env) ->
		gulp.task task, -> 
			taskDependency = require env.inject
			taskObject = new taskDependency gulp, env.config
			do taskObject.setupTask

	start: ->
		if allTasks?
			for task of allTasks
				if task?
					allEnvironments = allTasks[task]
					if allEnvironments? and allEnvironments[@environment]? and allEnvironments[@environment].inject?
						@startTasks.push task 
						@addTask task, allEnvironments[@environment]

		gulp.task 'default',  @startTasks


gulpfile = new Gulpfile
do gulpfile.start