var http = require('http');
var http_ip = '127.0.0.1';
var http_port = 8000;

var server = http.createServer(function (request, response) {
  require('./router').get(request, response);
});

server.listen(http_port, http_ip);
console.log('Server running at http://' + http_ip + ':' + http_port.toString() +'/');
