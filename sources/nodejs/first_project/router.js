var url = require('url');
var fs = require('fs');

exports.get = function(req, res) {
	req.requrl = url.parse(req.url, true);
	var pathname = req.requrl.pathname;
	if (/.(css)$/.test(pathname)){
		res.writeHead(200, {'Content-Type': 'text/css'});
		fs.readFile(__dirname + pathname, 'utf8', function (err, data){
			if (err) 
				throw err;
			res.write(data, 'utf8');
			res.end();
		});
	} 
	else {
		var urlSplitted = pathname.split('/').filter(function(el){ return el.length != 0 });
		if(urlSplitted.length > 0 && urlSplitted.length <= 2) {
			var action = urlSplitted.length == 2 
				? urlSplitted[1] 
				: 'index';
				
			try {
				require('./controllers/'+ urlSplitted[0])[action](req, res);
			}
			catch(err) {
				console.log(err);
				require('./controllers/404').get(req, res);
			}
		}
		else {
			require('./controllers/home').index(req, res);
		}
	}
}
