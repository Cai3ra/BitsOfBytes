'use strict';
SecurityProtocol = global.resolver.load 'SecurityProtocol', 'Communication/SecurityProtocol'

class GameProtocol
    constructor: (@server, @socket) ->
        @criptoAnalyzer = new SecurityProtocol @server, @socket

        @socket.on 'error', (e) =>
            if e.code in global.constants.ERRORS
                console.log "error handled: #{e}"

        @server.on 'error', (e) =>
            if e.code in global.constants.ERRORS
                console.log "error handled: #{e}"

        @socket.on 'data', (chunk) =>
            encryptedChunk = ''
            
            try
                if chunk.length > 300
                    console.log """received #{chunk}
                    *********************************"""
                    encryptedChunk = @criptoAnalyzer.decrypt do chunk.toString
                    console.log encryptedChunk
                else
                    @criptoAnalyzer.test chunk
            catch e
                console.log e  
            @socket.write encryptedChunk or @criptoAnalyzer.encrypt 123 
        @socket.on 'end', socket.end

module.exports = GameProtocol;

