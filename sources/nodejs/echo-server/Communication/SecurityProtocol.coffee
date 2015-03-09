'use strict';
ursa = global.resolver.load 'rsa dependency', 'ursa'
fs = global.resolver.load 'filesystem', 'fs'

class SecurityProtocol
    constructor: (@server, @socket) ->
        @crt = ursa.createPrivateKey fs.readFileSync 'C:\\desenvolvimento\\certificates\\my-server.key.pem'
        @key = ursa.createPublicKey fs.readFileSync 'C:\\desenvolvimento\\certificates\\my-server.pub'

    decrypt: (encryptedData) ->
        @crt.decrypt encryptedData, 'base64', 'utf8'

    encrypt: (plainTextData) ->
        @key.encrypt plainTextData, 'utf8', 'base64'

    isValidSignature: (assignedData) ->    
        yes
    assign: (plainTextData) ->
        assignedData = plainTextData
    
    isValid: (receivedData) ->
        if @server? and @socket? and receivedData?
            decryptedData = @decrypt receivedData
            if decryptedData?
                isValid = isValidSignature decryptedData
                if isValid? and isValid
                    global.log.info isValid
                    return yes
        no        
    test: (text) ->
        global.log.info 'Before encrypt:'
        global.log.info do text.toString
        
        text = @encrypt text
        global.log.info 'Now encrypted:'
        global.log.info text

        text = @decrypt text
        global.log.info 'Decrypted:'
        global.log.info text

module.exports = SecurityProtocol