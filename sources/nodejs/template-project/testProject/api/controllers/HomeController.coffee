module.exports = 
	index: (req, res) ->
		res.send "Hi there!"

	serialize: (req, res) ->
		res.json 
			id: 1
			name: "teste"
			age: 10

	html: (req, res) ->
		do res.view 

	redir: (req, res) ->
		res.redirect "http://www.google.com"

	find: (req, res) ->
		Customer.find({}) 
		.exec (err, found) ->
			res.json found
			
	insert: (req, res) ->
		Customer.create 
			Name: "Lucas node"
			Age: 25
		.exec (err, created) ->
			res.json err or created
		return

