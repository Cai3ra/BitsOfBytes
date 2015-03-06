'use strict';

# ************** loading necessary resources to start ********
colors = require 'colors'
DependencyResolver = require './System/DependencyResolver'
Logger = require './System/Logger'
log = new Logger
resolver = new DependencyResolver log
global.resolver = resolver;
# ************** /loading necessary resources to start ********

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
		console.log 'Connected'
		client.write 'Hello, server! Love, Client.'
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
		console.log "Received: #{decryptedData}"
		#do client.destroy
	 
	client.on 'close', ->
		console.log 'Connection closed'