watch = require 'gulp-watch'
path = require 'path'

basePath = './app'
buildPath = './build'

allTasks = 
	"jade": 
		"dev": 
			config: 
				from: "#{basePath}/html/jade/*.jade"
				to: "#{buildPath}/html/**/"
			inject: null
		"prod": 
			config: null
			inject: null
	"coffee": 
		"dev": 
			config: 
				from: "#{basePath}/scripts/coffee/*.coffee"
				to: "#{buildPath}/scripts/js/"	
			inject: "./tasks/coffee-task"
		"prod": 
			config: null
			inject: null
	"sass": 
		"dev": 
			config: null
			inject: null
		"prod": 
			config: null
			inject: null
	"less": 
		"dev": 
			config: 
				from: "#{basePath}/style/less/*.less"
				to: "#{buildPath}/style/css/"
			inject: "./tasks/less-task"
		"prod": 
			config: null
			inject: null
	"sync":
		"dev":
			config: 
				browser: 'chrome'
				logPrefix: 'Task Runner - tests'
				notify: true
				open: yes
				port: 3000
				server: 
					baseDir: '/'
					index: 'index.html'
			inject: "./tasks/browser-sync-task"
		"prod":
			config: null
			inject: null

if module? and module.exports?
	module.exports = allTasks