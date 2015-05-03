browserSync = require 'browser-sync'

class BrowserSyncTask
	constructor: (@gulp, @config) ->
		if @config is null
			@config =
				browser: 'chrome'
				logPrefix: 'Task Runner - tests'
				notify: true
				open: yes
				port: 3000
				server: 
					baseDir: '/'
					index: 'index.html'

	setupTask: ->
		browserSync @config

if module? and module.exports?
	module.exports = BrowserSyncTask