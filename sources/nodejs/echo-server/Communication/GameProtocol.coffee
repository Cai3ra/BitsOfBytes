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
                    chunk = do (chunk.toString 'utf-8').trim
                    console.log """received #{chunk}
                    *********************************"""
                    decryptedData = @criptoAnalyzer.decrypt chunk
                    console.log decryptedData
                    reply = @criptoAnalyzer.encrypt "i've received #{decryptedData}"
                    @socket.write reply
                else
                    @criptoAnalyzer.test chunk
            catch e
                console.log e  
        @socket.on 'end', socket.end

module.exports = GameProtocol;

