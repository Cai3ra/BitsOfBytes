'use strict';

class Constants
	constructor: ->
		@BASE_PATH = do process.cwd
		@PORT = 1337
		@HOST = '127.0.0.1'
		@ERRORS = ['EADDRINUSE','ECONNRESET','EADDRINUSE','EADDRINUSE']
		@VERSION = "1.0.0.0"

global.constants = new Constants

# Version 1.0.0.1:
#	- Second release, with:
#		* encrypt/decrypt messages
#		* layer separation
#		* constants, logging and dependecy resolver
# Version 1.0.0.0:
# 	- First release, just a chat