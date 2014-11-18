var template = require('../views/template-main');
var test_data = require('../models/test-data');

exports.get = function(req, res) {
	var teamlist = test_data.teamlist;
	var strTeam = "", i = 0;
	
	for (i = 0; i < teamlist.teams.length; i++) {
		strTeam += "<li>" + teamlist.teams[i].country + "</li>";
	}
	res.writeHead(200, {'Content-Type': 'text/html'});
	
	res.write(
		template.build(
			"Test web page on node.js",
			"Hello there",
			"<p>The teams in Group " 
			+ teamlist.GroupName 
			+ " for Euro 2012 are:</p>" 
			+ '<ul>' + strTeam + '</ul>'
		)
	);
	res.end();
}

exports.index = function(req, res) {
	var teamlist = test_data.teamlist;
	var strTeam = "", i = 0;
	
	for (i = 0; i < teamlist.teams.length; i++) {
		strTeam += "<li>" + teamlist.teams[i].country + "</li>";
	}
	res.writeHead(200, {'Content-Type': 'text/html'});
	
	res.write(
		template.build(
			"You are on Home/Index",
			"Hello there",
			"<p>The teams in Group " 
			+ teamlist.GroupName 
			+ " for Euro 2012 are:</p>" 
			+ '<ul>' + strTeam + '</ul>'
		)
	);
	res.end();
}

exports.info = function(req, res) {
	var teamlist = test_data.teamlist;
	var strTeam = "", i = 0;
	
	for (i = 0; i < teamlist.teams.length; i++) {
		strTeam += "<li>" + teamlist.teams[i].country + "</li>";
	}
	res.writeHead(200, {'Content-Type': 'text/html'});
	
	res.write(
		template.build(
			"You are on Home/Info",
			"Hello there",
			"<p>The teams in Group " 
			+ teamlist.GroupName 
			+ " for Euro 2012 are:</p>" 
			+ '<ul>' + strTeam + '</ul>'
		)
	);
	res.end();
}