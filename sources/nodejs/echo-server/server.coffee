'use strict';

#********************************************************************************#
#	 This program needs a software setup before to start...
#	 Get more information on the npmjs page, look for ursa on the top search
#
# openssl genrsa -out certs/server/my-server.key.pem 2048 
# openssl rsa -in certs/server/my-server.key.pem -pubout -out certs/client/my-server.pub 
#********************************************************************************#

Mongo = require './Model/MongoConnector'
# ************** loading necessary resources to start ********
DependencyResolver = require './System/DependencyResolver'
Logger = require './System/Logger'
# ************** /loading necessary resources to start ********

global.resolver = new DependencyResolver global.log = new Logger

# ************** loading resources using dependency resolver ********
net = global.resolver.load 'net', 'net'
GameProtocol = global.resolver.load 'GameProtocol','Communication/GameProtocol'
global.resolver.load 'Constants', 'System/Constants'
# ************** /loading resources using dependency resolver ********
	
do ->
    server = net.createServer (socket) ->
        global.log.info 'new client connected'
        protocol = new GameProtocol server, socket
    global.log.info "\r\nserver version #{global.constants.VERSION} listening on port: #{global.constants.PORT}\r\n"
    server.listen global.constants.PORT, global.constants.HOST
    mng = new Mongo