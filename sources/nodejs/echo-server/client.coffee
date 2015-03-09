
'use strict';

# ************** loading necessary resources to start ********
DependencyResolver = require './System/DependencyResolver'
Logger = require './System/Logger'
# ************** /loading necessary resources to start ********
global.resolver = new DependencyResolver global.log = new Logger
# ************** loading resources using dependency resolver ********
sys = global.resolver.load 'sys', 'sys'
net = global.resolver.load 'net', 'net'
GameProtocol = global.resolver.load 'GameProtocol','Communication/GameProtocol'
global.resolver.load 'Constants', 'System/Constants'
SecurityProtocol = global.resolver.load 'SecurityProtocol', 'Communication/SecurityProtocol'
# ************** /loading resources using dependency resolver ********

do ->
	stdin = do process.openStdin
	client = new net.Socket
	security = new SecurityProtocol null, null
	client.connect global.constants.PORT, global.constants.HOST, ->
		global.log.info 'Connected'
		stdin.addListener 'data', (data) ->
			data = do (data.toString 'utf-8').trim
			if data? and data is 'exit'
				do client.destroy
				do stdin.destroy
			else
				encryptedData = security.encrypt data
				client.write encryptedData

	client.on 'data', (data) =>
		data = do (data.toString 'utf-8').trim
		decryptedData = security.decrypt data
		global.log.info "Received: #{decryptedData}"
	 
	client.on 'close', ->
		global.log.warning 'Connection closed'