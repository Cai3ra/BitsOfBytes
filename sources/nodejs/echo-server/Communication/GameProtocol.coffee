'use strict';
SecurityProtocol = global.resolver.load 'SecurityProtocol', 'Communication/SecurityProtocol'

class GameProtocol
    constructor: (@server, @socket) ->
        @criptoAnalyzer = new SecurityProtocol @server, @socket

        @socket.on 'error', (e) =>
            if e.code in global.constants.ERRORS
                global.log.error "error handled: #{e}"

        @server.on 'error', (e) =>
            if e.code in global.constants.ERRORS
                global.log.error "error handled: #{e}"

        @socket.on 'data', (chunk) =>
            encryptedChunk = ''
            
            try
                if chunk.length > 300
                    chunk = do (chunk.toString 'utf-8').trim
                    global.log.data """received #{chunk}
                    *********************************"""
                    decryptedData = @criptoAnalyzer.decrypt chunk
                    global.log.info "replying: #{decryptedData}"
                    reply = @criptoAnalyzer.encrypt "i've received #{decryptedData}"
                    @socket.write reply
                else
                    @criptoAnalyzer.test chunk
            catch e
                global.log.error do e.toString, e  
        @socket.on 'end', ->
            global.log.warning "client signed out"
            do socket.end

module.exports = GameProtocol;

