http = require 'http'
http.createServer (req, res) ->
	res.writeHead 200, 'content-type': 'text/plain'
	res.end 'hello, world\n'
	return
.listen( 
	1337
	'127.0.0.1'
)

console.log "server running"	